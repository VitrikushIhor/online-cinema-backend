import { IsOptional, IsString } from 'class-validator'

export class CreateActorDto {
	@IsString()
	name: string;

	@IsString()
	slug: string;

	@IsString()
	photo: string;

	@IsString()
	description: string;

}

export class UpdateActorDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	slug?: string;

	@IsOptional()
	@IsString()
	photo?: string;

	@IsOptional()
	@IsString()
	description?: string;

}