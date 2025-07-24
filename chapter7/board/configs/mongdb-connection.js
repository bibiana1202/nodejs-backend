// .env 파일 로드 (맨 위에 추가!)
require('dotenv').config();

const {MongoClient} = require('mongodb');
// 몽고디비 연결 주소
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

module.exports= function(callback){ // 몽고디비 커넥션 연결 함수 반환
    return MongoClient.connect(uri,callback);
}
