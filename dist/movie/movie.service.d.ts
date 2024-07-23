/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieModel } from './movie.model';
export declare class MovieService {
    private readonly movieModel;
    constructor(movieModel: ModelType<MovieModel>);
    getAll(searchTerm?: string): Promise<DocumentType<MovieModel>[]>;
    bySlug(slug: string): Promise<DocumentType<MovieModel>>;
    byActor(actorId: Types.ObjectId): Promise<DocumentType<MovieModel>[]>;
    byGenres(genreIds: Types.ObjectId[]): Promise<DocumentType<MovieModel>[]>;
    updateCountOpened(slug: string): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, MovieModel> & MovieModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: Types.ObjectId;
    }>>;
    byId(id: string): Promise<DocumentType<MovieModel>>;
    create(): Promise<Types.ObjectId>;
    update(id: string, dto: CreateMovieDto): Promise<DocumentType<MovieModel> | null>;
    delete(id: string): Promise<DocumentType<MovieModel> | null>;
    getMostPopular(): Promise<DocumentType<MovieModel>[]>;
    updateRating(id: string, newRating: number): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, MovieModel> & MovieModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: Types.ObjectId;
    }>>;
}
