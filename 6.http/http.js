var http=require("http");
var fs=require("fs")

//req  第一个参数是请求
//res 第二个参数响应
var server=http.createServer(function(req,res){
    console.log(req.url);
   if(req.url=="/"){
        res.
        fs.readFile("./index.html",function(err,data){
            console.log(data.toString())
            res.end(data);
        })
   }
})
server.listen(8002);


















