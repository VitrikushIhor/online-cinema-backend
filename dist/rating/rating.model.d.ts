import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { MovieModel } from 'src/movie/movie.model';
import { UserModel } from 'src/user/user.model';
export interface RatingModel extends Base {
}
export declare class RatingModel extends TimeStamps {
    userId: Ref<UserModel>;
    movieId: Ref<MovieModel>;
    value: number;
}
