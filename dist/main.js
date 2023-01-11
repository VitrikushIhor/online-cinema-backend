"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const process = require("process");
async function start() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT || 5000;
    app.enableCors();
    app.setGlobalPrefix('api');
    const configSwagger = new swagger_1.DocumentBuilder()
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
        .build();
    const documentSwagger = swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup('api/docs', app, documentSwagger);
    await app.listen(PORT, () => `Server started on port = ${PORT}`);
}
start();
//# sourceMappingURL=main.js.map