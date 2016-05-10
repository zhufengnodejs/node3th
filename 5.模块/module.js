//在node模块的分类
// 1. 核心模块  url  path  http  util  fs
// 2. 第三方模块    gulp   mime   bower
// 3. 自定义模块（本地模块）  我自己写js
var obj={};
//定义模块 在node中建立一个js文件
function add(a,b){
    console.log(a+b);
}
obj.add=add;
obj.say=function(str){
    console.log(str);
}

//exports.add=and;
//1.exports 这个对象将模块中的方法暴露给其他模块
//2 module.exports  这个对象将模块中的方法暴露给其他模块
//exports=obj;

module.exports=obj;








