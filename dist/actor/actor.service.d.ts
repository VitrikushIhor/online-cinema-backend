import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { ActorModel } from "./actor.model";
import { UpdateActorDto } from './dto/actor.dto';
export declare class ActorService {
    private readonly actorModel;
    constructor(actorModel: ModelType<ActorModel>);
    getAll(searchTerm?: string): Promise<DocumentType<ActorModel>[]>;
    bySlug(slug: string): Promise<DocumentType<ActorModel>>;
    byId(id: string): Promise<DocumentType<ActorModel>>;
    create(): Promise<Types.ObjectId>;
    update(id: string, dto: UpdateActorDto): Promise<DocumentType<ActorModel> | null>;
    delete(id: string): Promise<DocumentType<ActorModel> | null>;
}
