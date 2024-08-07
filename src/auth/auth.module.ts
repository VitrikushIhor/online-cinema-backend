import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypegooseModule } from "nestjs-typegoose";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import { UserModel } from "../user/user.model";
import { AuthService } from "./auth.service";
import { getJWTConfig } from "../config/jwt.config";
import { FilesModule } from '../files/files.module'

@Module({
	controllers: [AuthController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: "User"
				}
			}
		]),
		ConfigModule,
		FilesModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		})
	],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}
