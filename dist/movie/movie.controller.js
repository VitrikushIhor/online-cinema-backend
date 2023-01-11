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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const id_validation_pipe_1 = require("../pipes/id.validation.pipe");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const movie_service_1 = require("./movie.service");
const Auth_decorators_1 = require("../auth/decorators/Auth.decorators");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async bySlug(slug) {
        return this.movieService.bySlug(slug);
    }
    async byActor(actorId) {
        return this.movieService.byActor(actorId);
    }
    async byGenres(genreIds) {
        return this.movieService.byGenres(genreIds);
    }
    async getAll(searchTerm) {
        return this.movieService.getAll(searchTerm);
    }
    async getMostPopular() {
        return this.movieService.getMostPopular();
    }
    async updateCountOpened(slug) {
        return this.movieService.updateCountOpened(slug);
    }
    async get(id) {
        return this.movieService.byId(id);
    }
    async create() {
        return this.movieService.create();
    }
    async update(id, dto) {
        const updateMovie = await this.movieService.update(id, dto);
        if (!updateMovie)
            throw new common_1.NotFoundException('Movie not found');
        return updateMovie;
    }
    async delete(id) {
        const deletedDoc = await this.movieService.delete(id);
        if (!deletedDoc)
            throw new common_1.NotFoundException('Movie not found');
    }
};
__decorate([
    (0, common_1.Get)('by-slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "bySlug", null);
__decorate([
    (0, common_1.Get)('by-actors/:actorId'),
    __param(0, (0, common_1.Param)('actorId', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "byActor", null);
__decorate([
    (0, common_1.Post)('by-genres'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('genreIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "byGenres", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/most-popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMostPopular", null);
__decorate([
    (0, common_1.Post)('/update-count-opened'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "updateCountOpened", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, Auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, Auth_decorators_1.Auth)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "create", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    (0, Auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, Auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "delete", null);
MovieController = __decorate([
    (0, swagger_1.ApiTags)('Movie'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map