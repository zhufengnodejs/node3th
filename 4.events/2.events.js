var util=require("util");
var EventEmetter=require("events")


function Girl(){

}
//原型链基础
util.inherits(Girl,EventEmetter);
//实例化
var girl=new Girl();
//添加监听事件
//girl.addListener("hungry",function(){
//    console.log("快去吃饭吧！")
//})
//girl.addListener("hungry",function(){
//    console.log("快去吃饭吧!！")
//})
//girl.addListener("hungry",function(){
//    console.log(arguments);
//    console.log("快去吃饭吧!！")
//})

//设置监听队列的大小
girl.setMaxListeners(1);

//注册事件
var call=function(){
    console.log("快去吃饭吧1!！");
}
girl.on("hungry",call)
//注册事件  只能发射一次
var call1=function(){
    console.log("快去吃饭吧2!！");
}
girl.on("hungry",call1);

//移除监听事件 第一参数事件的名字  第二个参数要移除的事件
//girl.removeListener("hungry",call);
//移除所有的监听事件
//girl.removeAllListeners("hungry");

girl.emit("hungry");











//girl.emit("sad");
//girl.emit("sad");
//girl.emit("sad");


//发射事件 第一个参数是事件名称  剩下所有的参数都会传递给注册的回调函数中 不管你用addlistener 还是 on 注册的事件 都用emit方法发射
//girl.emit("hungry","巧克力","雪糕");
//girl.emit("hungry","巧克力","雪糕");
//girl.emit("hungry","巧克力","雪糕");









