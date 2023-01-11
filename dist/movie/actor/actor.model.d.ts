import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface ActorModel extends Base {
}
export declare class ActorModel extends TimeStamps {
    name: string;
    photo: string;
    slug: string;
}
