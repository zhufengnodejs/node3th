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
        var page=1;
        var Pagesize=10;
        //console.log(urlObjct.query.page=="undefined");
        if(urlObjct.query.page!="undefined"){
            page=urlObjct.query.page;
        }
        if(urlObjct.query.Pagesize!="undefined"){
            Pagesize=urlObjct.query.Pagesize;
        }
        //计算从那条数据开始
       //当前页1  0   Pagesize*(1-1) -》 Pagesize*(page-1)
       //当前页2  10  Pagesize*(2-1) -》 Pagesize*(page-1)
       //当前页3  20  Pagesize*(3-1) -》 Pagesize*(page-1)
       var start=Pagesize*(page-1);
        //计算从那条数据结束
       var end= Pagesize*page;

        //读取数据
        fs.readFile("./1.txt", function (err,data) {
            if(err){
                res.end("{\"success\":\"no\",\"error\":\"服务器发生错误！请稍后再试\"}");
            }
            // 20 20 30
            else{
                //将数据转换成对象
                var obj=JSON.parse(data.toString())
                console.log(obj.result.length,start,end);
                if(obj.result.length>=start){
                    //根据查询条件返回对应的结果
                    obj.result=obj.result.slice(start,end);
                    //向客户返回当前时间
                    obj.time=new Date().toLocaleString();
                    //向客户返回操作状态
                    obj.success="ok";
                    //console.log(JSON.stringify(obj));
                    res.end(JSON.stringify(obj));
                }
                else{
                    var temobj={};
                    temobj.success="no";
                    temobj.error="没有数据了！";
                    console.log(JSON.stringify(temobj));
                    res.end(JSON.stringify(temobj));
                }


            }
        })
    }

})

server.listen(8080);
