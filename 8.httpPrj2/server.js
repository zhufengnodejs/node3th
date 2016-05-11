var http = require("http");
var fs = require("fs");
var mime = require("mime");
var url = require("url");

var server = http.createServer(function (req, res) {

    var urlObjct = url.parse(req.url, true);
    if (urlObjct.pathname == "/") {
        //设置返回数据的格式
        res.setHeader("Content-Type", mime.lookup("index.html") + ";charset=utf8")
        fs.readFile("./index.html", function (err, data) {
            //当文件读取失败 将错误信息返回客户端
            if (err) {
                //console.log(err);
                res.end(JSON.stringify(err));
            }
            //将读取的文件返回给客户端
            else {
                res.end(data);
            }
        })
    }
    else if (urlObjct.pathname == "/getList") {
        var page = 1;
        var Pagesize = 10;
        //console.log(urlObjct.query.page=="undefined");
        if (urlObjct.query.page != "undefined") {
            page = urlObjct.query.page;
        }
        if (urlObjct.query.Pagesize != "undefined") {
            Pagesize = urlObjct.query.Pagesize;
        }
        //计算从那条数据开始
        //当前页1  0   Pagesize*(1-1) -》 Pagesize*(page-1)
        //当前页2  10  Pagesize*(2-1) -》 Pagesize*(page-1)
        //当前页3  20  Pagesize*(3-1) -》 Pagesize*(page-1)
        var start = Pagesize * (page - 1);
        //计算从那条数据结束
        var end = Pagesize * page;

        //读取数据
        fs.readFile("./1.txt", function (err, data) {
            if (err) {
                res.end("{\"success\":\"no\",\"error\":\"服务器发生错误！请稍后再试\"}");
            }

            else {
                //将数据转换成对象
                var obj = JSON.parse(data.toString())
                //console.log(obj.result.length,start,end);
                //判断数据量是否够 当前查询的数据条数大于开始条数
                //如果大于那就证明数据够 去集合中截取数据
                //如果小于那么说明数据不够  不用去集合中截取数据

                if (obj.result.length > start) {
                    //根据查询条件返回对应的结果
                    obj.result = obj.result.slice(start, end);
                    //向客户返回当前时间
                    obj.time = new Date().toLocaleString();
                    //向客户返回操作状态
                    obj.success = "ok";
                    //console.log(JSON.stringify(obj));
                    res.end(JSON.stringify(obj));
                }
                else {
                    var temobj = {};
                    temobj.success = "no";
                    temobj.error = "没有数据了！";
                    //console.log(JSON.stringify(temobj));
                    res.end(JSON.stringify(temobj));
                }


            }
        })
    }
    //删除的路由
    else if(urlObjct.pathname=="/delete")
    {
        //获取要删除的id
        var id= urlObjct.query.id;
        //读取数据
        var obj=JSON.parse(fs.readFileSync("./1.txt","utf8"));
        //循环每一条数据  找出id相等的然后删除
        if(id==4){
            //生成返回给客户端的数据
            var result={};
            result.success="no";
            result.error="编号为4的用户不允许删除！";
            res.end(JSON.stringify(result));
            return;
        }
        for(var i=0;i<obj.result.length;i++){
            var current=obj.result[i];
            if(current.id==id){
                obj.result.splice(i,1);
                break;
            }
        }
        //将对象转换成字符串
        var objstr=JSON.stringify(obj);
        //将更新数据保存到1.txt文档中
        fs.writeFileSync("./1.txt",objstr,"utf8");

        //生成返回给客户端的数据
        var result={};
        result.success="ok";
        res.end(JSON.stringify(result));


    }

})

server.listen(8080);
