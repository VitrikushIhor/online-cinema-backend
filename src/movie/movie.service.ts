import {Injectable} from '@nestjs/common'
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types'
import {Types} from 'mongoose'
import {InjectModel} from 'nestjs-typegoose'

import { CreateMovieDto, UpdateMovieDto } from './dto/create-movie.dto'
import {MovieModel} from './movie.model'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>,
	) {
	}

	async getAll(searchTerm?: string): Promise<DocumentType<MovieModel>[]> {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return await this.movieModel
			.find(options)
			.select('-updatedAt -__v')
			.sort({createdAt: 'desc'})
			.populate('genres actors')
			.exec()
	}

	async bySlug(slug: string): Promise<DocumentType<MovieModel>> {
		return await this.movieModel.findOne({slug}).populate('genres actors').exec()
	}

	async byActor(actorId: Types.ObjectId): Promise<DocumentType<MovieModel>[]> {
		return await this.movieModel.find({actors: actorId}).exec()
	}

	async byGenres(
		genreIds: Types.ObjectId[]
	): Promise<DocumentType<MovieModel>[]> {
		return await this.movieModel.find({genres: {$in: genreIds}}).exec()
	}

	async updateCountOpened(slug: string) {
		return await this.movieModel
			.findOneAndUpdate({slug}, {$inc: {countOpened: 1}})
			.exec()
	}

	/* Admin area */

	async byId(id: string): Promise<DocumentType<MovieModel>> {
		return await this.movieModel.findById(id).exec()
	}

	async create(): Promise<Types.ObjectId> {
		const defaultValue: CreateMovieDto = {
			bigPoster: '',
			actors: [],
			genres: [],
			poster: '',
			title: '',
			videoUrl: '',
			slug: '',
		}
		const movie = await this.movieModel.create(defaultValue)
		return movie._id
	}

	async update(id: string, dto: UpdateMovieDto): Promise<DocumentType<MovieModel> | null> {
		return await this.movieModel.findByIdAndUpdate(id, dto, {new: true}).exec()
	}

	async delete(id: string): Promise<DocumentType<MovieModel> | null> {
		return await this.movieModel.findByIdAndDelete(id).exec()
	}

	async getMostPopular(): Promise<DocumentType<MovieModel>[]> {
		return await this.movieModel
			.find({countOpened: {$gt: 0}})
			.sort({countOpened: -1})
			.populate('genres')
			.exec()
	}

	async updateRating(id: string, newRating: number) {
		return await this.movieModel
			.findByIdAndUpdate(id, {rating: newRating}, {new: true})
			.exec()
	}

}
