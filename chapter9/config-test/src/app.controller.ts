import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config'; // ConfigService 임포트

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {} // ConfigService 주입

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE');
    return message;
  }

  @Get('service-url') // http://localhost:3000/service-url 의 경로 진입시 실행
  getServiceUrl():string{
    return this.configService.get<string>('SERVICE_URL', 'http://localhost:3000');
  }
}
