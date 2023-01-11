"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const app_root_path_1 = require("app-root-path");
const fs_extra_1 = require("fs-extra");
let FilesService = class FilesService {
    async saveFiles(files, folder = 'default') {
        const uploadFolder = `${app_root_path_1.path}/uploads/${folder}`;
        await (0, fs_extra_1.ensureDir)(uploadFolder);
        const res = await Promise.all(files.map(async (file) => {
            await (0, fs_extra_1.writeFile)(`${uploadFolder}/${file.originalname}`, file.buffer);
            return {
                url: `/uploads/${folder}/${file.originalname}`,
                name: file.originalname,
            };
        }));
        return res;
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map