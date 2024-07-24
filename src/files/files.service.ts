import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { FileResponse } from './dto/file.response';
import { Express } from 'express'

@Injectable()
export class FilesService {
	constructor(private readonly configService: ConfigService) {
		cloudinary.config({
			cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
			api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
			api_secret: this.configService.get<string>('CLOUDINARY_SECRET_KEY'),
		});
	}

	private async uploadToCloudinary(file:Express.Multer.File, folder: string): Promise<UploadApiResponse> {
		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder,
					public_id: file.originalname,
					resource_type: 'auto',
				},
				(error: UploadApiErrorResponse, result: UploadApiResponse) => {
					if (error) return reject(error);
					resolve(result);
				},
			);

			uploadStream.end(file.buffer);
		});
	}

	async saveFiles(
		files: Express.Multer.File[],
		folder = 'space-cinema/default',
	): Promise<FileResponse[]> {
		const responses: FileResponse[] = await Promise.all(
			files.map(async (file) => {
				const uploadResult = await this.uploadToCloudinary(file, `space-cinema/${folder}`);

				return {
					url: uploadResult.secure_url,
					name: file.originalname,
				};
			}),
		);

		return responses;
	}
}
