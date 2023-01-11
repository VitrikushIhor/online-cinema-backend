import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from '../user/user.model';
export declare class AuthService {
    private readonly UserModel;
    private readonly jwtService;
    constructor(UserModel: ModelType<UserModel>, jwtService: JwtService);
    login({ email, password }: AuthDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: any;
            email: any;
            isAdmin: any;
        };
    }>;
    register({ email, password }: AuthDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: any;
            email: any;
            isAdmin: any;
        };
    }>;
    getNewTokens({ refreshToken }: RefreshTokenDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: any;
            email: any;
            isAdmin: any;
        };
    }>;
    findByEmail(email: string): Promise<any>;
    validateUser(email: string, password: string): Promise<UserModel>;
    issueTokenPair(userId: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    returnUserFields(user: UserModel): {
        _id: any;
        email: any;
        isAdmin: any;
    };
}
