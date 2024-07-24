import { Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { MovieModel } from 'src/movie/movie.model';
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    email: string;
    password: string;
    avatar?: string;
    userName: string;
    isAdmin?: boolean;
    favorites?: Ref<MovieModel>[];
}
export type UserProfile = Omit<UserModel, "password" | "favorites" | "isAdmin" | "id">;
