import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsOptional()
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	password?: string

	@IsOptional()
	@IsString()
	avatar: string

	@IsOptional()
	@IsString()
	userName: string

	isAdmin?: boolean
}


