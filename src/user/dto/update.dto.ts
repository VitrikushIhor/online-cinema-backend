import { IsEmail, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsEmail()
	email: string

	@IsString()
	password?: string

	@IsString()
	avatar: string

	@IsString()
	userName: string

	isAdmin?: boolean
}
