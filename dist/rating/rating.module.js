"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModule = void 0;
const common_1 = require("@nestjs/common");
const rating_service_1 = require("./rating.service");
const rating_controller_1 = require("./rating.controller");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const rating_model_1 = require("./rating.model");
const movie_module_1 = require("../movie/movie.module");
let RatingModule = class RatingModule {
};
RatingModule = __decorate([
    (0, common_1.Module)({
        controllers: [rating_controller_1.RatingController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: rating_model_1.RatingModel,
                    schemaOptions: {
                        collection: 'Rating',
                    },
                },
            ]),
            movie_module_1.MovieModule,
        ],
        providers: [rating_service_1.RatingService],
        exports: [rating_service_1.RatingService],
    })
], RatingModule);
exports.RatingModule = RatingModule;
//# sourceMappingURL=rating.module.js.map