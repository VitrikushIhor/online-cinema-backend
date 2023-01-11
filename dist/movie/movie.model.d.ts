import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ActorModel } from 'src/actor/actor.model';
import { GenreModel } from 'src/genre/genre.model';
export interface MovieModel extends Base {
}
export declare class Parameter {
    year: number;
    duration: number;
    country: string;
}
export declare class MovieModel extends TimeStamps {
    poster: string;
    bigPoster: string;
    title: string;
    parameters: Parameter;
    rating?: number;
    genres: Ref<GenreModel>[];
    countOpened?: number;
    videoUrl: string;
    actors: Ref<ActorModel>[];
    slug: string;
}
