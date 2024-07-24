import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from './user.model'
import { CommentModule } from '../comment/comment.module'

@Module({
	controllers: [UserController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
		CommentModule
	],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
