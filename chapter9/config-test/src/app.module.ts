import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherModule } from './weather/weather.module';

console.log('===========================================');
console.log('현재 환경변수 NODE_ENV:', process.env.NODE_ENV);
console.log('current working directory:',process.cwd()); // 현재 디렉토리 출력
console.log('===========================================');

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,
    envFilePath:`${process.cwd()}/envs/${process.env.NODE_ENV}.env`,}), // 환경변수 파일 경로 지정
    WeatherModule
  ], // ConfigModule 설정, 전역 모듈 설정 추가
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
