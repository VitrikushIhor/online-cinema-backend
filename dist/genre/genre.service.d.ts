import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { MovieService } from 'src/movie/movie.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreModel } from './genre.model';
import { ICollection } from './interfaces/genre.interface';
export declare class GenreService {
    private readonly genreModel;
    private readonly movieService;
    constructor(genreModel: ModelType<GenreModel>, movieService: MovieService);
    getAll(searchTerm?: string): Promise<DocumentType<GenreModel>[]>;
    bySlug(slug: string): Promise<DocumentType<GenreModel>>;
    getPopular(): Promise<DocumentType<GenreModel>[]>;
    getCollections(): Promise<ICollection[]>;
    byId(id: string): Promise<DocumentType<GenreModel>>;
    create(): Promise<Types.ObjectId>;
    update(id: string, dto: CreateGenreDto): Promise<DocumentType<GenreModel> | null>;
    delete(id: string): Promise<DocumentType<GenreModel> | null>;
}
