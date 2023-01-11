/// <reference types="multer" />
import { FileResponse } from './dto/file.response';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<FileResponse[]>;
}
