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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let FilesService = class FilesService {
    constructor(configService) {
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_SECRET_KEY'),
        });
    }
    async uploadToCloudinary(file, folder) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder,
                public_id: file.originalname,
                resource_type: 'auto',
            }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            uploadStream.end(file.buffer);
        });
    }
    async saveFiles(files, folder = 'space-cinema/default') {
        const responses = await Promise.all(files.map(async (file) => {
            const uploadResult = await this.uploadToCloudinary(file, `space-cinema/${folder}`);
            return {
                url: uploadResult.secure_url,
                name: file.originalname,
            };
        }));
        return responses;
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map