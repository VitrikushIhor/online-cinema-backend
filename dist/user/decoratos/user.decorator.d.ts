import { UserModel } from "../user.model";
export declare const User: (...dataOrPipes: (keyof UserModel | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
