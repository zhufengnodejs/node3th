//require() 加载一个模块

//注意事项  1.路径一定要正确  2. .js后缀可以省略

//require的原理
//(function(exports,require,module,__filename,__dirname){
// exports={}
//    //导出对象 引用地址
//    exports=module.exports;
//    function add(a,b){
//        console.log(a+b);
//    }
//
//    return module.exports;
//});

var math0=require("./module.js");


var math=require("./a.json"); //一次导出终生受用 a.json 模块缓存
//模块缓存在哪里
//console.log(require.cache);
//console.log(require.resolve('./a.json'));
delete require.cache[require.resolve('./a.json')];
var math1=require("./a.json");



console.log(module);

//math.add(2,4);
//math.say("你好珠峰培训！")


