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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const actor_model_1 = require("./actor.model");
let ActorService = class ActorService {
    constructor(actorModel) {
        this.actorModel = actorModel;
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm) {
            options = {
                $or: [
                    {
                        name: new RegExp(searchTerm, 'i'),
                    },
                    {
                        slug: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        }
        return (this.actorModel
            .aggregate()
            .match(options)
            .lookup({
            from: 'Movie',
            localField: '_id',
            foreignField: 'actors',
            as: 'movies',
        })
            .addFields({
            countMovies: { $size: '$movies' },
        })
            .project({ __v: 0, updatedAt: 0, movies: 0 })
            .sort({ createdAt: -1 })
            .exec());
    }
    async bySlug(slug) {
        return this.actorModel.findOne({ slug }).exec();
    }
    async byId(id) {
        return this.actorModel.findById(id).exec();
    }
    async create() {
        const defaultValue = {
            name: '',
            photo: '',
            slug: '',
        };
        const actor = await this.actorModel.create(defaultValue);
        return actor._id;
    }
    async update(id, dto) {
        return this.actorModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    async delete(id) {
        return this.actorModel.findByIdAndDelete(id).exec();
    }
};
ActorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(actor_model_1.ActorModel)),
    __metadata("design:paramtypes", [Object])
], ActorService);
exports.ActorService = ActorService;
//# sourceMappingURL=actor.service.js.map