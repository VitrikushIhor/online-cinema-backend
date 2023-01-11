/// <reference types="multer" />
import { FileResponse } from "./file.interface";
export declare class FilesService {
    saveFiles(files: Express.Multer.File[], folder?: string): Promise<FileResponse[]>;
}
