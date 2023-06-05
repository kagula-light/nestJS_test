import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
export declare class UserController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UserService);
    login(loginParams: any): Promise<{
        code: number;
        data: {
            token: string;
        };
        msg: string;
    } | {
        code: number;
        msg: string;
        data?: undefined;
    }>;
    register(body: any): Promise<any>;
}
