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
exports.RatingController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const Auth_decorators_1 = require("../auth/decorators/Auth.decorators");
const id_validation_pipe_1 = require("../pipes/id.validation.pipe");
const user_decorator_1 = require("../user/decorators/user.decorator");
const set_rating_dto_1 = require("./dto/set-rating.dto");
const rating_service_1 = require("./rating.service");
const swagger_1 = require("@nestjs/swagger");
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    async setRating(userId, dto) {
        return this.ratingService.setRating(userId, dto);
    }
    async getMovieValueByUser(movieId, userId) {
        return this.ratingService.getMovieValueByUser(movieId, userId);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('set-rating'),
    (0, common_1.HttpCode)(200),
    (0, Auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, set_rating_dto_1.SetRatingDto]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "setRating", null);
__decorate([
    (0, common_1.Get)('/:movieId'),
    (0, Auth_decorators_1.Auth)(),
    __param(0, (0, common_1.Param)('movieId', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "getMovieValueByUser", null);
RatingController = __decorate([
    (0, swagger_1.ApiTags)('Rating'),
    (0, common_1.Controller)('ratings'),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingController);
exports.RatingController = RatingController;
//# sourceMappingURL=rating.controller.js.map