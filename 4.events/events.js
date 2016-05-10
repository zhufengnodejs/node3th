var EventEmetter=require("events");

var event=new EventEmetter();
//注册一个事件
event.addListener("click",function(){
    console.log("click");
});

//1秒钟以后开始执行我注册的事件
setTimeout(function(){
    event.emit("click");
},1000)



