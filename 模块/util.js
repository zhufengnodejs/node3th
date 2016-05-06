var util= require("util");

//inherits 用来实现继承的方法
function People(){
    this.name="人类";
    this.eat=function(){
        console.log("我会吃饭！")
    }
}
//People.prototype.say=function(){
//    console.log("我是人类");
//}
//function BlackPeople(){
//    this.color="black"
//}
//BlackPeople.prototype=new People();
//util.inherits(BlackPeople,People);
//var black=new BlackPeople();
//black.say();
//black.eat();

var people=new People();
//2.inspect 将对象转换成字符串
console.log(util.inspect(people));

//isArray  判断是不是一个数组
console.log(util.isArray([]));
//isRegExp 判断是不是一个正则
console.log(util.isRegExp(/\d+/));
//isDate   判断是不是一个日期
console.log(util.isDate(new Date()));
//isError  判断是不是一个错误
console.log(util.isError(new Error()));


















//inspect
//isArray
//isRegExp
//isDate
//isError