import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface GenreModel extends Base {
}
export declare class GenreModel extends TimeStamps {
    name: string;
    slug: string;
    description: string;
    icon: string;
}
