import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document; // 블로그이면서 도큐먼트인 타입 정의

@Schema() // 스키마
export class Blog{
    @Prop() // 스키마의 프로퍼티
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    name: string;

    @Prop()
    createdDt: Date;

    @Prop()
    updatedDt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog); // 스키마 생성
