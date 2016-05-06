


//console.log(global.global.global);


//console 向控制台打印日志
//console.log("log");
//console.info("info");
//console.error("error");
//console.warn("warn");

//测试代码运行时间
//console.time("222");
//for(var i=0;i<100000;i++){
//
//}
//setTimeout(function(){
//    console.timeEnd("222")
//},2000)


////获取当前文件所在文件夹的绝对路径
//console.log(__dirname)
////获取当前文件的绝对路径
//console.log(__filename)

//在global里找不到
//console.log(global.__dirname);

console.log("-1")
//定时器
setTimeout(function(){
    console.log("1");
    setTimeout(function(){
        console.log("100");
    },1000)
},1000);
setTimeout(function(){
    console.log("1.5");
},2000);
//将参数中的函数 放在下一个事件循环列表
setImmediate(function(){
    console.log("2")
});
//将参数中的函数 放在下一个事件循环列表
setImmediate(function(){
    console.log("3")
});

console.log("-1.5")




