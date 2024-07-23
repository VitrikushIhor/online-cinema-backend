"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mongoose_1 = require("mongoose");
const rating_model_1 = require("./rating.model");
const movie_service_1 = require("../movie/movie.service");
let RatingService = class RatingService {
    constructor(ratingModel, movieService) {
        this.ratingModel = ratingModel;
        this.movieService = movieService;
    }
    async averageRatingByMovie(movieId) {
        const ratingsMovie = await this.ratingModel
            .aggregate()
            .match({ movieId: new mongoose_1.Types.ObjectId(movieId) })
            .exec();
        return (ratingsMovie.reduce((acc, item) => acc + item.value, 0) /
            ratingsMovie.length);
    }
    async setRating(userId, dto) {
        const { movieId, value } = dto;
        const newRating = await this.ratingModel
            .findOneAndUpdate({ movieId, userId }, {
            userId,
            movieId,
            value,
        }, { upsert: true, new: true, setDefaultsOnInsert: true })
            .exec();
        const averageRating = await this.averageRatingByMovie(movieId);
        await this.movieService.updateRating(movieId, averageRating);
        return newRating;
    }
    async getMovieValueByUser(movieId, userId) {
        return await this.ratingModel
            .findOne({ movieId, userId })
            .select('value')
            .exec()
            .then((data) => (data ? data.value : 0));
    }
};
RatingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(rating_model_1.RatingModel)),
    __metadata("design:paramtypes", [Object, movie_service_1.MovieService])
], RatingService);
exports.RatingService = RatingService;
//# sourceMappingURL=rating.service.js.map