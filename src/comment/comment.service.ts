import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
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



	async byMovieId(movieId: string) {
		const comments = await this.CommentModel
			 .find({ movie: movieId }, '-__v')
			 .sort({ createdAt: 'desc' })
			 .populate('user', 'userName avatar email');

		return comments;
	}

	async create(userId: string, dto: CommentDto) {
		const { message, movieId } = dto;

		const newComment = await this.CommentModel.create({
			message,
			movie: movieId,
			user: userId,
		});

		return newComment;
	}

	async delete(commentId: string) {
		const deletedComment = await this.CommentModel.findByIdAndDelete(commentId);
		return deletedComment;
	}

	async deleteByUserId(userId: string) {
		const deletedComment = await this.CommentModel.deleteMany({ userId: userId });
		return deletedComment;
	}
}
