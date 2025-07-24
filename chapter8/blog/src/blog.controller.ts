import {Controller, Param, Body, Delete, Get, Post, Put} from '@nestjs/common'; // 데코레이터 함수 임포트
import { BlogService } from './blog.service'; // 블로그 서비스 임포트

@Controller('blog') // 클래스에 붙이는 Controller 데코레이터
export class BlogController{
    blogService: BlogService;

    // 생성자 에서 블로그 서비스 생성
    constructor(){
        this.blogService = new BlogService(); 
    }

    // 모든 게시글 가져오기
    @Get() // GET 요청 처리
    getAllPosts(){
        console.log('모든 게시물 가져오기');
        return this.blogService.getAllPosts();
    }

    // 게시글 작성
    @Post() // POST 요청 처리
    createPost(@Body() postDto){ // HTTP 요청의 body 내용을 post에 할당
        console.log('게시글 작성');
        this.blogService.createPost(postDto);
        return 'success';
    }

    // 게시글 하나 읽기
    @Get('/:id') // GET에 URL 매개변수에 id 가 있는 요청 처리
    getPost(@Param('id') id: string){
        console.log(`[id:${id}] 게시글 하나 가져오기`);
        return this.blogService.getPost(id);
    }

    // 게시글 삭제
    @Delete('/:id') // DELETE 방식에 URL 매개변수로 id가 있는 요청 처리
    deletePost(@Param('id') id:string){
        console.log('게시글 삭제');
        this.blogService.delete(id);
        return 'success';
    }

    // 게시글 업데이트
    @Put('/:id') // PUT 방식에 URL 매개변수로 전달된 id가 있는 요청 처리
    updatePost(@Param('id') id:string, @Body() postDto){
        console.log(`[${id}] 게시글 업데이트`,id,postDto);
        return this.blogService.updatePost(id,postDto);
    }

}