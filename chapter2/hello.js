const http = require("http"); // http 객체 생성
let count = 0;

const server = http.createServer((req,res)=>{       // 서버 객체 생성
    log(count);                                     // 카운트 1 증가
    res.statusCode = 200;                           // 결괏값 200
    res.setHeader("Content-Type", "text-plain");    // 헤더 설정
    res.write("hello\n");                           // 응답값 설정
    setTimeout(()=>{
        res.sendDate("Node.js");                    // 2초 후 Node.js 출력
    }, 2000);       
});

function log(count){
    console.log((count+= 1));
}

server.listen(8000,()=>console.log("Hello Node.js")); // 8000 번 포트로 서버 실행