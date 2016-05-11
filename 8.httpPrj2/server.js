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
    //根据id获取用户信息
    else if(urlObjct.pathname=="/getUserById"){
        //获取要删除的id
        var id= urlObjct.query.id;
        //读取数据
        var obj=JSON.parse(fs.readFileSync("./1.txt","utf8"));
        //循环每一条数据  查找id对应的数据
        //查找出了的结果返回结果
        var current={};
        //表示是否找到id对应的用户
        var flag=false;
        for(var i=0;i<obj.result.length;i++){
            //获取当前用户
            current=obj.result[i];
            if(current.id==id){
                flag=true;
                current=current;
                break;
            }
            else{
                current=null;
            }
        }
        //根据不同的表示给客户端返回不同的数据
        //如果 flag=false 说明没有找到数据
        //如果 flag=ture 说明找到数据
        if(flag)
        {
            var obj={}
            obj.success="ok";
            obj.result=current;
            res.end(JSON.stringify(obj));
        }
        else{
            var obj={}
            obj.success="no";
            obj.error="没有找到对应的数据！"
            res.end(JSON.stringify(obj));
        }
    }
    //更新用户的路由  接受客户端post传过来的数据
    else if(urlObjct.pathname=="/update")
    {
        var bufs=[];
        req.on("data",function(data){
            bufs.push(data);
        })
        req.on("end",function(){

            var m_user=JSON.parse(Buffer.concat(bufs).toString());
            //console.log(fs.readFileSync("./1.txt").toString());
            var obj=JSON.parse(fs.readFileSync("./1.txt"));
            //循环每一条数据  查找id对应的数据
            //表示是否找到id对应的用户
            var flag=false;
            for(var i=0;i<obj.result.length;i++){
                //获取当前用户
                var current=obj.result[i];
                if(current.id==m_user.id){
                    //找到对应的数据后并进行修改
                    current.name=m_user.name;
                    current.age=m_user.age;
                    flag=true;
                    break;
                }
                else{
                    current=null;
                }
            }
            //根据不同的表示给客户端返回不同的数据
            //如果 flag=false 说明没有找到数据
            //如果 flag=ture 说明找到数据
            if(flag)
            {
                fs.writeFileSync('./1.txt',JSON.stringify(obj))
                var obj={}
                obj.success="ok";
                console.log(JSON.stringify(obj));
                res.end(JSON.stringify(obj));
            }
            else{

                var obj={}
                obj.success="no";
                obj.error="没有找到对应的数据！"
                console.log(JSON.stringify(obj));
                res.end(JSON.stringify(obj));
            }
        })

    }

})

server.listen(8080);
