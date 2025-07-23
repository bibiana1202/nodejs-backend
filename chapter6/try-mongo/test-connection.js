// .env 파일 로드 (맨 위에 추가!)
require('dotenv').config();


const {MongoClient} = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true, // 개발 환경에서만 사용
});


async function run(){
    await client.connect();
    const adminDB = client.db('test').admin();
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);
    return "OK";    
}

run()
    .then(console.log)
    .catch(console.error)
    .finally(()=>client.close());