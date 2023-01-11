/// <reference types="multer" />
import { FileResponse } from "./file.interface";
import { FilesService } from "./file.service";
export declare class FileController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<FileResponse[]>;
}
