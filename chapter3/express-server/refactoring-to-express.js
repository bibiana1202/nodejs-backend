const url = rquire("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port,()=>{
    console.log("익스프레스로 라우터 리펙터링 하기");
});

// GET 메서드의 라우팅 설정
app.get("/",(_,res)=>res.end("HOME"));
app.get("/user",user);
app.get("/feed",feed);

function user(req,res){
    const user = url.parse(req.url,true).query;

    // 결괏값으로 유저명과 나이 제공
    res.json(`[user] name : ${user.name}, age : ${user.age}`);
}

function feed(_,res){ // /feed 로 요청이 오면 실행되는 함수
    res.json(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
            </ul>`); 
}