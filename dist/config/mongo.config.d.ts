import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";
export declare const getMongoDbConfig: (configService: ConfigService) => Promise<TypegooseModuleOptions>;
