import { IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
	@ApiProperty({ example: 'test@gmail.com', description: 'email' })
	@IsString()
	email: string

	@ApiProperty({ example: '123sdsd33', description: 'password' })
	@MinLength(6, { message: 'Password cannot be less than 6 characters' })
	@IsString()
	password: string
}
