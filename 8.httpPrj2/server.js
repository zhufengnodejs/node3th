var http = require("http");
var fs = require("fs");
var mime = require("mime");
var url = require("url");

var server = http.createServer(function (req, res) {

    var urlObjct = url.parse(req.url, true);
    if (urlObjct.pathname == "/") {
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
        console.log(urlObjct.query.page=="undefined");
        if(urlObjct.query.page!="undefined"){
            page=urlObjct.query.page;
        }
        if(urlObjct.query.Pagesize!="undefined"){
            Pagesize=urlObjct.query.Pagesize;
        }

        console.log(page,Pagesize);
        fs.readFile("./" + page + ".txt", function (err,data) {

            if(err){

                res.end('{"success":"no"}');
            }
            else{
                var obj=JSON.parse(data.toString());
                obj.result=obj.result.slice(0,Pagesize);

                res.end(JSON.stringify(obj));
            }

        })
    }

})

server.listen(8080);
