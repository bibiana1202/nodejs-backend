import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 리포지토리 주입 데코레이터
import { User } from './user.entity';
import { Repository } from 'typeorm'; // 리포지토리 임포트 ->저장,읽기같은 기본적인 메서드 제공

@Injectable() // 의존성 주입을 위한 데코레이터
export class UserService {

    // 리포지토리 주입
    constructor(@InjectRepository(User) private userRepository: Repository<User>,){} 

    // 유저 생성
    createUser(user) : Promise<User>{
        return this.userRepository.save(user);
    }

    // 한명의 유저 정보 찾기
    async getUser(email: string){
        console.log(email);
        const result = await this.userRepository.findOne({
            where : {email},
        });
        console.log('result',result);
        return result;
    }

    // 유저 정보 업데이트, username과 password만 변경
    async updateUser(email: string,_user: any){
        const user = await this.getUser(email); // 타입 지정 제거!
        if(!user){
            throw new Error('사용자를 찾을수 없습니다.');
        }
        console.log(_user);
        user.username = _user.username;
        user.password = _user.password;
        console.log(user);
        return await this.userRepository.save(user);
    }

    // 유저 정보 삭제
    deleteUser(email: any){
        return this.userRepository.delete({email});
    }

    async findByEmailOrSave(email,username,providerId):Promise<User>{
        const foundUser = await this.getUser(email);
        if(foundUser){
            return foundUser;
        }

        const newUser = await this.userRepository.save({
            email,
            username,
            providerId,
        });
        return newUser;
    }
}
