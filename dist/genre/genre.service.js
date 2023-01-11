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
exports.GenreService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const movie_service_1 = require("../movie/movie.service");
const genre_model_1 = require("./genre.model");
let GenreService = class GenreService {
    constructor(genreModel, movieService) {
        this.genreModel = genreModel;
        this.movieService = movieService;
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm) {
            options = {
                $or: [
                    {
                        name: new RegExp(searchTerm, 'i'),
                    },
                    {
                        slug: new RegExp(searchTerm, 'i'),
                    },
                    {
                        description: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        }
        return this.genreModel
            .find(options)
            .select('-updatedAt -__v')
            .sort({ createdAt: 'desc' })
            .exec();
    }
    async bySlug(slug) {
        return this.genreModel.findOne({ slug }).exec();
    }
    async getPopular() {
        return this.genreModel
            .find()
            .select('-updatedAt -__v')
            .sort({ createdAt: 'desc' })
            .exec();
    }
    async getCollections() {
        const genres = await this.getAll();
        const collections = await Promise.all(genres.map(async (genre) => {
            const moviesByGenre = await this.movieService.byGenres([genre._id]);
            const result = {
                _id: String(genre._id),
                title: genre.name,
                slug: genre.slug,
                image: moviesByGenre[0].bigPoster,
            };
            return result;
        }));
        return collections;
    }
    async byId(id) {
        return this.genreModel.findById(id).exec();
    }
    async create() {
        const defaultValue = {
            description: '',
            icon: '',
            name: '',
            slug: '',
        };
        const genre = await this.genreModel.create(defaultValue);
        return genre._id;
    }
    async update(id, dto) {
        return this.genreModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    async delete(id) {
        return this.genreModel.findByIdAndDelete(id).exec();
    }
};
GenreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(genre_model_1.GenreModel)),
    __metadata("design:paramtypes", [Object, movie_service_1.MovieService])
], GenreService);
exports.GenreService = GenreService;
//# sourceMappingURL=genre.service.js.map