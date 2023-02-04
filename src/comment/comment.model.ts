import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from '../user/user.model'
import {MovieModel} from '../movie/movie.model';

export interface CommentModel extends Base {}

export class CommentModel extends TimeStamps {
	@prop({ ref: () => UserModel })
	user: Ref<UserModel>

	@prop({ ref: () => MovieModel })
	movie: Ref<MovieModel>

	@prop()
	message: string
}
