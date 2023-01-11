import { RefreshTokenDto } from './dto/refreshToken.dto';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    login(data: AuthDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: any;
            email: any;
            isAdmin: any;
        };
    }>;
    getNewTokens(data: RefreshTokenDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: any;
            email: any;
            isAdmin: any;
        };
    }>;
    register(dto: AuthDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: any;
            email: any;
            isAdmin: any;
        };
    }>;
}
