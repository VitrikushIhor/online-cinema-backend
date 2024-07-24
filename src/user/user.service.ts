import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash } from 'bcryptjs'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateUserDto } from './dto/update.dto'
import { UserModel, UserProfile } from './user.model'
import { CommentService } from '../comment/comment.service'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
	private readonly commentService: CommentService
	) {}

	async byId(id: string): Promise<DocumentType<UserModel>> {
		const user = await this.userModel.findById(id).exec()

		if (user) return user
		throw new NotFoundException('User not found')
	}


	async getProfile(id: string): Promise<UserProfile> {
		const user= await this.userModel.findById(id)

		if (user) {
			return {
				_id: user._id,
				email: user.email,
				userName: user.userName,
				avatar: user.avatar
			}
		}
		throw new NotFoundException('User not found')
	}

	async updateProfile(_id: string, data: UpdateUserDto): Promise<void> {
		// Перевірка, чи є email в даних
		if (data.email && data.email.trim() !== '') {
			const isSameUser = await this.userModel.findOne({ email: data.email });

			if (isSameUser && String(_id) !== String(isSameUser._id)) {
				throw new BadRequestException('Email is already in use');
			}
		}

		// Отримання користувача
		const user: DocumentType<UserModel> | null = await this.userModel.findById(_id);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		// Хешування пароля, якщо він вказаний
		let newPassword: string | undefined;
		if (data.password && data.password.trim() !== '') {
			const salt = await genSalt(10);
			newPassword = await hash(data.password, salt);
		}

		// Оновлення користувача
		const updateData = { ...data };
		if (newPassword) {
			updateData.password = newPassword;
		}

		const updatedUser = await this.userModel.findByIdAndUpdate(_id, updateData, { new: true }).exec();

		if (!updatedUser) {
			throw new NotFoundException('Failed to update user');
		}

	}

	async getFavoriteMovies(_id: string) {
		return await this.userModel
			.findById(_id, 'favorites')
			.populate({
				path: 'favorites',
				populate: {
					path: 'genres',
				},
			})
			.exec()
			.then((data) => {
				return data.favorites
			})
	}

	async toggleFavorite(movieId: Types.ObjectId, user: UserModel) {
		const { favorites, _id } = user

		await this.userModel.findByIdAndUpdate(_id, {
			favorites: favorites.includes(movieId)
				? favorites.filter((id) => String(id) !== String(movieId))
				: [...favorites, movieId],
		})
	}

	async getCount() {
		return await  this.userModel.find().count().exec()
	}

	async getAll(searchTerm?: string): Promise<DocumentType<UserModel>[]> {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return await this.userModel
			.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	async delete(id: string): Promise<DocumentType<UserModel> | null> {
		const user =  await this.userModel.findByIdAndDelete(id).exec()
		const comment = await this.commentService.deleteByUserId(id)
		return user
	}
}
