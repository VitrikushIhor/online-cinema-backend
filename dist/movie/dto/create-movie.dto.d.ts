export declare class Parameter {
    year: number;
    duration: number;
    country: string;
}
export declare class CreateMovieDto {
    poster: string;
    bigPoster: string;
    title: string;
    parameters?: Parameter;
    genres: string[];
    actors: string[];
    videoUrl: string;
    slug: string;
}
export declare class UpdateMovieDto {
    poster: string;
    bigPoster: string;
    title: string;
    parameters?: Parameter;
    genres: string[];
    actors: string[];
    videoUrl: string;
    slug: string;
}
