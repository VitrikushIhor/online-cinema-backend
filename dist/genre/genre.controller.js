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
exports.GenreController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const id_validation_pipe_1 = require("../pipes/id.validation.pipe");
const create_genre_dto_1 = require("./dto/create-genre.dto");
const genre_service_1 = require("./genre.service");
const swagger_1 = require("@nestjs/swagger");
let GenreController = class GenreController {
    constructor(genreService) {
        this.genreService = genreService;
    }
    async bySlug(slug) {
        return this.genreService.bySlug(slug);
    }
    async getAll(searchTerm) {
        return this.genreService.getAll(searchTerm);
    }
    async getPopular() {
        return this.genreService.getPopular();
    }
    async getCollections() {
        return this.genreService.getCollections();
    }
    async get(id) {
        return this.genreService.byId(id);
    }
    async create() {
        return this.genreService.create();
    }
    async update(id, dto) {
        const updateGenre = await this.genreService.update(id, dto);
        if (!updateGenre)
            throw new common_1.NotFoundException('Movie not found');
        return updateGenre;
    }
    async delete(id) {
        const deletedDoc = await this.genreService.delete(id);
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
], GenreController.prototype, "bySlug", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "getPopular", null);
__decorate([
    (0, common_1.Get)('/collections'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "getCollections", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "get", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, auth_decorators_1.Auth)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "create", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_genre_dto_1.CreateGenreDto]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "delete", null);
GenreController = __decorate([
    (0, swagger_1.ApiTags)('Genre'),
    (0, common_1.Controller)('genres'),
    __metadata("design:paramtypes", [genre_service_1.GenreService])
], GenreController);
exports.GenreController = GenreController;
//# sourceMappingURL=genre.controller.js.map