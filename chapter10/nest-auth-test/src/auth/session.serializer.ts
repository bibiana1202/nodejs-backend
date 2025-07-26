import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer{ // PassportSerializer 상속받음
    constructor(private userService: UserService){ // userService를 주입받음
        super();
    }
    
    // 세션에 정보를 저장할 때 사용
    serializeUser(
    user: any,
    done: (err: Error | null, user: any) => void, // ✅ null 허용
    ): any {
    done(null, user.email);
    }

    // 세션에서 정보를 꺼내올 때 사용
    async deserializeUser(payload: any, done: (err: Error | null, user?: any) => void) {
    const user = await this.userService.getUser(payload);
    if (!user) {
        return done(new Error('No user'), null); // ✅ ok
    }
    return done(null, user);
    }


}