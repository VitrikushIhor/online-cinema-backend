import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as process from 'process'

async function start() {
	const app = await NestFactory.create(AppModule)
	const PORT = process.env.PORT || 5000

	app.enableCors()
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

	await app.listen(PORT, () => `Server started on port = ${PORT}`)
}

start()
