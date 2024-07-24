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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const movie_model_1 = require("./movie.model");
let MovieService = class MovieService {
    constructor(movieModel) {
        this.movieModel = movieModel;
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm) {
            options = {
                $or: [
                    {
                        title: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        }
        return await this.movieModel
            .find(options)
            .select('-updatedAt -__v')
            .sort({ createdAt: 'desc' })
            .populate('genres actors')
            .exec();
    }
    async bySlug(slug) {
        return await this.movieModel.findOne({ slug }).populate('genres actors').exec();
    }
    async byActor(actorId) {
        return await this.movieModel.find({ actors: actorId }).exec();
    }
    async byGenres(genreIds) {
        return await this.movieModel.find({ genres: { $in: genreIds } }).exec();
    }
    async updateCountOpened(slug) {
        return await this.movieModel
            .findOneAndUpdate({ slug }, { $inc: { countOpened: 1 } })
            .exec();
    }
    async byId(id) {
        return await this.movieModel.findById(id).exec();
    }
    async create() {
        const defaultValue = {
            bigPoster: '',
            actors: [],
            genres: [],
            poster: '',
            title: '',
            videoUrl: '',
            slug: '',
        };
        const movie = await this.movieModel.create(defaultValue);
        return movie._id;
    }
    async update(id, dto) {
        return await this.movieModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    async delete(id) {
        return await this.movieModel.findByIdAndDelete(id).exec();
    }
    async getMostPopular() {
        return await this.movieModel
            .find({ countOpened: { $gt: 0 } })
            .sort({ countOpened: -1 })
            .populate('genres')
            .exec();
    }
    async updateRating(id, newRating) {
        return await this.movieModel
            .findByIdAndUpdate(id, { rating: newRating }, { new: true })
            .exec();
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(movie_model_1.MovieModel)),
    __metadata("design:paramtypes", [Object])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map