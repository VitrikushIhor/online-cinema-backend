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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("./user.model");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async byId(id) {
        const user = await this.userModel.findById(id).exec();
        if (user)
            return user;
        throw new common_1.NotFoundException('User not found');
    }
    async updateProfile(_id, data) {
        const user = await this.userModel.findById(_id);
        const isSameUser = await this.userModel.findOne({ email: data.email });
        if (isSameUser && String(_id) !== String(isSameUser._id)) {
            throw new common_1.NotFoundException('Email busy');
        }
        if (user) {
            if (data.password) {
                const salt = await (0, bcryptjs_1.genSalt)(10);
                user.password = await (0, bcryptjs_1.hash)(data.password, salt);
            }
            user.email = data.email;
            if (data.isAdmin || data.isAdmin === false)
                user.isAdmin = data.isAdmin;
            await user.save();
            return;
        }
        throw new common_1.NotFoundException('User not found');
    }
    async getFavoriteMovies(_id) {
        return this.userModel
            .findById(_id, 'favorites')
            .populate({
            path: 'favorites',
            populate: {
                path: 'genres',
            },
        })
            .exec()
            .then((data) => {
            return data.favorites;
        });
    }
    async toggleFavorite(movieId, user) {
        const { favorites, _id } = user;
        await this.userModel.findByIdAndUpdate(_id, {
            favorites: favorites.includes(movieId)
                ? favorites.filter((id) => String(id) !== String(movieId))
                : [...favorites, movieId],
        });
    }
    async getCount() {
        return this.userModel.find().count().exec();
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm) {
            options = {
                $or: [
                    {
                        email: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        }
        return this.userModel
            .find(options)
            .select('-password -updatedAt -__v')
            .sort({ createdAt: 'desc' })
            .exec();
    }
    async delete(id) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map