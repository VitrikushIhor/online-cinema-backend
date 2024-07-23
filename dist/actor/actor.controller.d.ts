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
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/actor.dto';
export declare class ActorController {
    private readonly actorService;
    constructor(actorService: ActorService);
    getAll(searchTerm?: string): Promise<import("@typegoose/typegoose").DocumentType<import("./actor.model").ActorModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    bySlug(slug: string): Promise<import("@typegoose/typegoose").DocumentType<import("./actor.model").ActorModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    create(): Promise<import("mongoose").Types.ObjectId>;
    get(id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./actor.model").ActorModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    update(id: string, dto: CreateActorDto): Promise<import("@typegoose/typegoose").DocumentType<import("./actor.model").ActorModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    delete(id: string): Promise<void>;
}
