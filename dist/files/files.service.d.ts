/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { FileResponse } from './dto/file.response';
export declare class FilesService {
    private readonly configService;
    constructor(configService: ConfigService);
    private uploadToCloudinary;
    saveFiles(files: Express.Multer.File[], folder?: string): Promise<FileResponse[]>;
}
