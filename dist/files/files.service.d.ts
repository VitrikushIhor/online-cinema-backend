/// <reference types="multer" />
import { FileResponse } from './dto/file.response';
export declare class FilesService {
    saveFiles(files: Express.Multer.File[], folder?: string): Promise<FileResponse[]>;
}
