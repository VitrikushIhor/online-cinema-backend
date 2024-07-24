import { IsOptional, IsString } from 'class-validator'

export class CreateGenreDto {
	@IsString()
	name: string

	@IsString()
	slug: string

	@IsString()
	description: string

	@IsString()
	icon: string
}

export class UpdateGenreDto {
	@IsOptional()
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	slug: string

	@IsOptional()
	@IsString()
	description: string

	@IsOptional()
	@IsString()
	icon: string
}
