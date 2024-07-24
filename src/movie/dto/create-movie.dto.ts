import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator'

export class Parameter {
	@IsNumber()
	year: number

	@IsNumber()
	duration: number

	@IsString()
	country: string
}

export class CreateMovieDto {
	@IsString()
	poster: string

	@IsString()
	bigPoster: string

	@IsString()
	title: string

	@IsObject()
	parameters?: Parameter

	@IsArray()
	@IsString({ each: true })
	genres: string[]

	@IsArray()
	@IsString({ each: true })
	actors: string[]

	@IsString()
	videoUrl: string

	@IsString()
	slug: string
}

export class UpdateMovieDto {
	@IsOptional()
	@IsString()
	poster: string

	@IsOptional()
	@IsString()
	bigPoster: string

	@IsOptional()
	@IsString()
	title: string

	@IsOptional()
	@IsObject()
	parameters?: Parameter

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	genres: string[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	actors: string[]

	@IsOptional()
	@IsString()
	videoUrl: string

	@IsOptional()
	@IsString()
	slug: string
}


