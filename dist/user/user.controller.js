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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("./decorators/user.decorator");
const user_service_1 = require("./user.service");
const Auth_decorators_1 = require("../auth/decorators/Auth.decorators");
const update_dto_1 = require("./dto/update.dto");
const id_validation_pipe_1 = require("../pipes/id.validation.pipe");
const user_model_1 = require("./user.model");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(_id) {
        return this.userService.byId(_id);
    }
    async updateProfile(_id, data) {
        return this.userService.updateProfile(_id, data);
    }
    async getFavorites(_id) {
        return this.userService.getFavoriteMovies(_id);
    }
    async toggleFavorite(movieId, user) {
        return this.userService.toggleFavorite(movieId, user);
    }
    async getCountUsers() {
        return this.userService.getCount();
    }
    async getUsers(searchTerm) {
        return this.userService.getAll(searchTerm);
    }
    async getUser(id) {
        return this.userService.byId(id);
    }
    async updateUser(id, data) {
        return this.userService.updateProfile(id, data);
    }
    async delete(id) {
        const deletedDoc = await this.userService.delete(id);
        if (!deletedDoc)
            throw new common_1.NotFoundException('Movie not found');
    }
};
__decorate([
    (0, common_1.Get)('profile'),
    (0, Auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)('profile'),
    (0, common_1.HttpCode)(200),
    (0, Auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('profile/favorites'),
    (0, Auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Post)('profile/favorites'),
    (0, common_1.HttpCode)(200),
    (0, Auth_decorators_1.Auth)(),
    __param(0, (0, common_1.Body)('movieId', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleFavorite", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, Auth_decorators_1.Auth)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCountUsers", null);
__decorate([
    (0, common_1.Get)(),
    (0, Auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Query)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, Auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    (0, Auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, Auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map