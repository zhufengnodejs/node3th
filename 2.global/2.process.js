
//console.log(global.process);
//
////当前工作目录
//console.log(process.cwd());
//console.log(__dirname);
//
////切换当前工作目录
//process.chdir("..")
//
//console.log(process.cwd());
//console.log(__dirname);
//获取当前内存使用情况
//{ rss: 16678912,  常驻内存
// heapTotal: 9275392,  总内存
// heapUsed: 3991848   已使用的内存
// }
//console.log(process.memoryUsage())
//
//var array=[];
//while(true){
//    array.push("你好珠峰培训");
//    console.log(process.memoryUsage());
//}

setImmediate(function(){console.log(4)})
setTimeout(function(){console.log(5)},1000)
console.log(1);
//将参数函数放在本次任务队列末尾
process.nextTick(function(){
    console.log(2);
})
process.nextTick(function(){
    console.log(6);
    //while(true){
    //
    //}
})
console.log(3);


