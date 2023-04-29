import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './dto/file.response';

@Injectable()
export class FilesService {
	async saveFiles(
		 files: Express.Multer.File[],
		 folder = 'default',
	): Promise<FileResponse[]> {
		const uploadFolder = `${path}/uploads/${folder}`;

		// Перевіряємо чи існує тека для завантаження файлів.
		await ensureDir(uploadFolder);

		const responses: FileResponse[] = await Promise.all(
			 files.map(async (file) => {
				 // Записуємо файли на диск.
				 await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

				 // Повертаємо масив з відповіддю на кожен файл.
				 return {
					 url: `/uploads/${folder}/${file.originalname}`,
					 name: file.originalname,
				 };
			 }),
		);

		return responses;
	}
}
