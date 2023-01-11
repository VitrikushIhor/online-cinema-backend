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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreService } from './genre.service';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    bySlug(slug: string): Promise<import("@typegoose/typegoose").DocumentType<import("./genre.model").GenreModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    getAll(searchTerm?: string): Promise<import("@typegoose/typegoose").DocumentType<import("./genre.model").GenreModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    getPopular(): Promise<import("@typegoose/typegoose").DocumentType<import("./genre.model").GenreModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    getCollections(): Promise<import("./interfaces/genre.interface").ICollection[]>;
    get(id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./genre.model").GenreModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    create(): Promise<import("mongoose").Types.ObjectId>;
    update(id: string, dto: CreateGenreDto): Promise<import("@typegoose/typegoose").DocumentType<import("./genre.model").GenreModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    delete(id: string): Promise<void>;
}
