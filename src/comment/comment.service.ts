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

	async create(userId: Types.ObjectId, dto: CommentDto) {
		return this.CommentModel.create({
			message: dto.message,
			movie: dto.movieId,
			user: userId
		})
	}
}
