import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as process from 'process'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

async function start() {
	const app = await NestFactory.create(AppModule)
	const PORT = process.env.PORT || 5000
	// eslint-disable-next-line no-console
	console.log(PORT)


	app.setGlobalPrefix('api')

	const configSwagger = new DocumentBuilder()
		.setTitle('Online cinema Title')
		.setDescription('online cinema description')
		.setVersion('1.0.0')
		.addTag('Auth')
		.addTag('User')
		.addTag('Actor')
		.addTag('Genre')
		.addTag('Movie')
		.addTag('Rating')
		 .addTag('File')
		 .addTag('Comment')
		.build()

	const documentSwagger = SwaggerModule.createDocument(app, configSwagger)
	SwaggerModule.setup('api/docs', app, documentSwagger)

	const corsOptions: CorsOptions = {
		origin: '*', // Замініть на домен вашого клієнта
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		allowedHeaders: 'Content-Type, Accept, Authorization',
	};
	app.enableCors(corsOptions);

	await app.listen(PORT, () => `Server started on port = ${PORT}`)
}

start()
