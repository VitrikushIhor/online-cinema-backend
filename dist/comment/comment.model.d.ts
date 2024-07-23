import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { UserModel } from '../user/user.model';
import { MovieModel } from '../movie/movie.model';
export interface CommentModel extends Base {
}
export declare class CommentModel extends TimeStamps {
    user: Ref<UserModel>;
    movie: Ref<MovieModel>;
    message: string;
}
