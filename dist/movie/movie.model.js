"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = exports.Parameter = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const actor_model_1 = require("../actor/actor.model");
const genre_model_1 = require("../genre/genre.model");
class Parameter {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Parameter.prototype, "year", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Parameter.prototype, "duration", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Parameter.prototype, "country", void 0);
exports.Parameter = Parameter;
class MovieModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], MovieModel.prototype, "poster", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], MovieModel.prototype, "bigPoster", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], MovieModel.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Parameter)
], MovieModel.prototype, "parameters", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 4.0 }),
    __metadata("design:type", Number)
], MovieModel.prototype, "rating", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => genre_model_1.GenreModel }),
    __metadata("design:type", Array)
], MovieModel.prototype, "genres", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], MovieModel.prototype, "countOpened", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], MovieModel.prototype, "videoUrl", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => actor_model_1.ActorModel }),
    __metadata("design:type", Array)
], MovieModel.prototype, "actors", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], MovieModel.prototype, "slug", void 0);
exports.MovieModel = MovieModel;
//# sourceMappingURL=movie.model.js.map