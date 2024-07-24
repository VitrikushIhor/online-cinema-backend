import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update.dto';
import { UserModel, UserProfile } from './user.model';
import { CommentService } from '../comment/comment.service';
export declare class UserService {
    private readonly userModel;
    private readonly commentService;
    constructor(userModel: ModelType<UserModel>, commentService: CommentService);
    byId(id: string): Promise<DocumentType<UserModel>>;
    getProfile(id: string): Promise<UserProfile>;
    updateProfile(_id: string, data: UpdateUserDto): Promise<void>;
    getFavoriteMovies(_id: string): Promise<import("@typegoose/typegoose/lib/types").Ref<import("../movie/movie.model").MovieModel, Types.ObjectId>[]>;
    toggleFavorite(movieId: Types.ObjectId, user: UserModel): Promise<void>;
    getCount(): Promise<number>;
    getAll(searchTerm?: string): Promise<DocumentType<UserModel>[]>;
    delete(id: string): Promise<DocumentType<UserModel> | null>;
}
