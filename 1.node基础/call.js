function say(call){

    setTimeout(function(){
        call();
    },1000)
}

function print(){
    console.log("欢迎大家来珠峰听我讲Node.js");
}

function print2(){
    console.log("大家好我叫樊建宙");
}

say(print2);

