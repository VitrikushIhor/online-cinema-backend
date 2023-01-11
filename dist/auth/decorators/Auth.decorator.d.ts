import { TypeRole } from '../auth.interface';
export declare function Auth(role?: TypeRole): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
