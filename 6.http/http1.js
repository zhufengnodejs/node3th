var http=require("http");

//req  第一个参数是请求
//res 第二个参数响应
var server=http.createServer(function(req,res){
    res.end("读文件");
})
server.listen(8001);
