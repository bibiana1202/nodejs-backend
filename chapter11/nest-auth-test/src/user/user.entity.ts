// 데코레이터 임포트
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 엔티티 객체임을 알려주기 위한 데코레이터
export class User {
    @PrimaryGeneratedColumn()
    id?: number; // id는 pk이며 자동 증가하는 값

    @Column({unique:true})
    email: string; // email은 유니크한 값
    
    @Column({nullable:true})
    password: string;

    @Column()
    username: string;

    @Column({type:"datetime",default:()=>"CURRENT_TIMESTAMP"})
    createdDt: Date = new Date(); // 기본값을 넣어줌

    @Column({nullable:true})
    providerId:string;

}