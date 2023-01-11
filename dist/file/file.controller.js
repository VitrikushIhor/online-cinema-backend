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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const platform_express_1 = require("@nestjs/platform-express");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
let FileController = class FileController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async uploadFile(file, folder) {
        return this.filesService.saveFiles([file], folder);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, auth_decorators_1.Auth)("admin"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)("folder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
FileController = __decorate([
    (0, common_1.Controller)("files"),
    __metadata("design:paramtypes", [file_service_1.FilesService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map