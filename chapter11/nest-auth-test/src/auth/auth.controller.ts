import { Body, Controller, Get, Post, Req, Request,Response, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { AuthenticatedGuard, LocalAuthGuard,LoginGuard ,GoogleAuthGuard} from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    // 회원 가입
    @Post('register')
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto);
    }

    // 로그인
    @Post('login')
    async login(@Request() req, @Response() res){ // Request,Response 둘다 사용
        // validateUser를 호출해 유저 정보 획득
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );
        console.log(userInfo);
        // 유저 정보가 있으면, 쿠키 정보를 Response에 저장
        if(userInfo){
            res.cookie('login',JSON.stringify(userInfo),{
                httpOnly:false, // 브라우저에서 읽을 수 있도록 함
                maxAge:1000*60*60*24*7, // 7days 단위는 밀리초
            });
        }
        return res.send({message:'login success'});
    }

    // LoginGuard 사용
    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res){
        if(!req.cookies['login'] && req.user){ // 쿠키 정보는 없지만 request에 user 정보가 있다면 응답값에 쿠키 정보 추가
            // 응답에 쿠키 정보 추가
            res.cookie('login',JSON.stringify(req.user),{
                httpOnly:true,
                maxAge:1000*10,// 로그인 테스트를 고려해 10초로 설ㄷ정
            });
        }
        return res.send({message:'login2 success'});
    }

    // 로그인을 한 때만 실행되는 메서드
    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard(){
        return '로그인된때만 이 글이 보입니다.';
    }

    @UseGuards(LocalAuthGuard)
    @Post('login3')
    login3(@Request() req){
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req){
        return req.user;
    }

    // 구글 로그인으로 이동하는 라우터 메서드
    @Get('to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req){}

    // 구글 로그인 후 콜백 실행 후 이동시 실행되는 라우터 메서드
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req,@Response() res){
        const {user} = req;
        return res.send(user);
    }
}
