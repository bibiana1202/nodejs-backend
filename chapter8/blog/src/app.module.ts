// .env 파일 로드 (맨 위에 추가!)
require('dotenv').config();

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {BlogController} from './blog.controller';
import { BlogMongoRepository } from "./blog.repository";
import { Blog,BlogSchema } from "./blog.schema";
import {BlogService} from './blog.service';

@Module({
  imports:[
    // 몽고디비 연결 설정
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    // 몽고디비 스키마 설정
    MongooseModule.forFeature([{name:Blog.name,schema:BlogSchema}]),
  ],
  controllers:[BlogController],
  providers:[BlogService,BlogMongoRepository], // 프로바이더 설정
})

export class AppModule {}
