async function myName(){
    return "Andy";
}

async function showName(){ // 이름을 출력하는 함수
    const name = await myName();
    console.log('name : ',name);
}

function waitOneSecond(msg){
    return new Promise((reslove,_)=>{
        setTimeout(()=>reslove(`${msg}`),1000);
    });
}

async function countOneToTen(){
    for(let x of [...Array(10).keys()]){
        let result = await waitOneSecond(`${x+1}초 대기중...`);
        console.log(result);
    }
    console.log("완료");
}

// console.log(myName());
// console.log(showName());
countOneToTen();