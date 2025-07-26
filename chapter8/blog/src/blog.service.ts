import {PostDto} from './blog.model'; // 게시글의 타입 정보 임포트
// import { BlogFileRepository,BlogRepository } from './blog.repository'; // 리포지토리 클래스와 인터페이스 임포트
import { BlogMongoRepository } from './blog.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService{
    // posts = []; // 게시글 배열 선언
    // blogRepository: BlogRepository;
    
    // 블로그 리포지토리 객체 생성
    // constructor(){ 
    //     this.blogRepository = new BlogFileRepository();
    // }

    // 생성자를 통한 의존성 주입
    constructor(private blogRepository:BlogMongoRepository){}

    // 모든 게시글 가져오기
    async getAllPosts(){
        return await this.blogRepository.getAllPost();
    }

    // 게시글 작성
    createPost(postDto:PostDto){
        this.blogRepository.createPost(postDto);
    }

    // 게시글 하나 가져오기
    async getPost(id): Promise<PostDto>{
        return await this.blogRepository.getPost(id);
    }

    // 게시글 삭제
    delete(id){
        this.blogRepository.deletePost(id);
    }

    // 게시글 업데이트
    updatePost(id,postDto:PostDto){
        this.blogRepository.updatePost(id,postDto);
    }
}