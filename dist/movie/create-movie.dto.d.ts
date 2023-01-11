declare class Parameters {
    year: number;
    duration: number;
    country: number;
}
export declare class CreateMovieDataTransferObject {
    posters: string;
    bigPoster: string;
    title: string;
    description: string;
    parameters?: Parameters;
    slug: string;
    videoUrl: string;
    genres: string[];
    actors: string[];
    isSendTelegram: string;
}
export {};
