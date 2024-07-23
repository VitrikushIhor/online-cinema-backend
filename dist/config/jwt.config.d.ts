import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
export declare const getJWTConfig: (configService: ConfigService) => Promise<JwtModuleOptions>;
