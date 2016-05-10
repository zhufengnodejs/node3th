/**
 * Created by 建宙 on 2016/5/10.
 */
var fs=require("fs")
fs.readFile("."+"/index.css",function(err,data){
    console.log(err,data)
})