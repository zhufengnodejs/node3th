var http = require("http");
var fs = require("fs");
var mime = require("mime");

var server = http.createServer(function (req, res) {
    //console.log(req.url);

    if (req.url == "/") {
        //console.log("aa");
        //res.write("");
        //res.end(); //本次响应结束
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
    //else if(req.url=="/index.css"){
    //    //console.log("."+req.url);
    //    fs.readFile("."+req.url,function(err,data){
    //        console.log(mime.lookup(req.url));
    //        res.setHeader("Content-Type",mime.lookup(req.url)+";charset=utf8")
    //        res.end(data);
    //    });
    //}
    //else if(req.url=="/1.js"){
    //    fs.readFile("."+req.url,function(err,data){
    //        res.setHeader("Content-Type",mime.lookup(req.url)+";charset=utf8")
    //        res.end(data);
    //    });
    //}
    //else if(req.url=="/kitty.jpeg"){
    //    fs.readFile("."+req.url,function(err,data){
    //
    //        res.setHeader("Content-Type",mime.lookup(req.url)+";charset=utf8")
    //        res.end(data);
    //    });
    //}
    else if (req.url == "/clock") {
        res.end(new Date().toLocaleString());
    }
    else {
        console.log(req.url);
        fs.readFile("." + req.url, function (err, data) {
            res.setHeader("Content-Type", mime.lookup(req.url) + ";charset=utf8")
            res.end(data);
        });
    }

})

server.listen(8080);
