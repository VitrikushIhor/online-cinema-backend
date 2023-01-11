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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const refreshToken_dto_1 = require("./dto/refreshToken.dto");
const auth_dto_1 = require("./dto/auth.dto");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(data) {
        return this.authService.login(data);
    }
    async getNewTokens(data) {
        console.log(this.authService.getNewTokens(data));
        return this.authService.getNewTokens(data);
    }
    async register(dto) {
        const oldUser = await this.authService.findByEmail(dto.email);
        if (oldUser)
            throw new common_1.BadRequestException('User with this email is already in the system');
        return this.authService.register(dto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login to the system' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: auth_service_1.AuthService,
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Refresh token' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: auth_dto_1.AuthDto }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login/access-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refreshToken_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getNewTokens", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map