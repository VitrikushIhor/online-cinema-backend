import { Injectable } from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {ModelType} from '@typegoose/typegoose/lib/types';
import {CommentDto} from './dto/comment.dto';
import {CommentModel} from './comment.model';
import {Types} from 'mongoose';

@Injectable()
export class CommentService {
	constructor(
		 @InjectModel(CommentModel)
		 private readonly CommentModel: ModelType<CommentModel>
	) {}

	async byMovieId(movieId: Types.ObjectId) {
		return this.CommentModel.find({ movie: movieId }, '-__v')
			 .sort({ createdAt: 'desc' })
			 .populate('user', 'userName  avatar email ')
			 .exec()
	}

	async create(userId: Types.ObjectId, dto: CommentDto) {
		return this.CommentModel.create({
			message: dto.message,
			movie: dto.movieId,
			user: userId
		})
	}
}
