import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update.dto';
import { UserModel } from './user.model';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: ModelType<UserModel>);
    byId(id: string): Promise<DocumentType<UserModel>>;
    updateProfile(_id: string, data: UpdateUserDto): Promise<void>;
    getFavoriteMovies(_id: string): Promise<import("@typegoose/typegoose/lib/types").Ref<import("../movie/movie.model").MovieModel, Types.ObjectId>[]>;
    toggleFavorite(movieId: Types.ObjectId, user: UserModel): Promise<void>;
    getCount(): Promise<number>;
    getAll(searchTerm?: string): Promise<DocumentType<UserModel>[]>;
    delete(id: string): Promise<DocumentType<UserModel> | null>;
}
