"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoDbConfig = void 0;
const getMongoDbConfig = async (configService) => ({
    uri: configService.get("MONGO_URI")
});
exports.getMongoDbConfig = getMongoDbConfig;
//# sourceMappingURL=mongo.config.js.map