import {readFile,writeFile} from 'fs/promises'; // 파일을 읽고 쓰는 모듈 임포트
import {PostDto} from './blog.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Blog,BlogDocument} from './blog.schema';

// 블로그 리포지토리 인터페이스 정의
export interface BlogRepository{
    getAllPost() : Promise<PostDto[]>;
    createPost(postDto : PostDto);
    getPost(id:String): Promise<PostDto>;
    deletePost(id:String);
    updatePost(id:String,postDto:PostDto);
}

// BlogRepository 를 구현한 클래스. 파일 읽고 쓰기
@Injectable()
// 몽고디비용 리포지토리
export class BlogMongoRepository implements BlogRepository{
    // Model<BlogDocument> 타입인 blogModel 주입
    constructor(@InjectModel(Blog.name) private blogModel:Model<BlogDocument>){}

    // 모든 게시글을 읽어오는 함수
    async getAllPost(): Promise<Blog[]> {
       return await this.blogModel.find().exec();
    }

    // 게시글 작성
    async createPost(postDto: PostDto){
        const createPost = {
            ...postDto,
            createdDt : new Date(),
            updatedDt : new Date(),
        };
        this.blogModel.create(createPost);
    }

    // 하나의 게시글 읽기
    async getPost(id:string):Promise<PostDto>{
        return await this.blogModel.findById(id);
    }

    // 하나의 게시글 삭제
    async deletePost(id:string){
        await this.blogModel.findByIdAndDelete(id);
    }

    // 게시글 업데이트
    async updatePost(id: String, postDto: PostDto) {
        const updatePost = {id,...postDto,updatedDt:new Date()};
        await this.blogModel.findByIdAndUpdate(id,updatePost);
    }
}