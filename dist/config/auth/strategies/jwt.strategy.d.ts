import { ConfigService } from '@nestjs/config';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from '../../user/user.model';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly UserModel;
    constructor(configService: ConfigService, UserModel: ModelType<UserModel>);
    validate({ _id }: Pick<UserModel, '_id'>): Promise<any>;
}
export {};
