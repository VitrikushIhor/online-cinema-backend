declare class Parameters {
    year: number;
    duration: number;
    country: string;
}
export declare class UpdateMovieDto {
    poster: string;
    bigPoster: string;
    title: string;
    description: string;
    parameters?: Parameters;
    genres: string[];
    actors: string[];
    videoUrl: string;
    slug: string;
}
export {};
