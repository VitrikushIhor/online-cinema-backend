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
const comment_service_1 = require("../comment/comment.service");
let UserService = class UserService {
    constructor(userModel, commentService) {
        this.userModel = userModel;
        this.commentService = commentService;
    }
    async byId(id) {
        const user = await this.userModel.findById(id).exec();
        if (user)
            return user;
        throw new common_1.NotFoundException('User not found');
    }
    async getProfile(id) {
        const user = await this.userModel.findById(id);
        if (user) {
            return {
                _id: user._id,
                email: user.email,
                userName: user.userName,
                avatar: user.avatar
            };
        }
        throw new common_1.NotFoundException('User not found');
    }
    async updateProfile(_id, data) {
        if (data.email && data.email.trim() !== '') {
            const isSameUser = await this.userModel.findOne({ email: data.email });
            if (isSameUser && String(_id) !== String(isSameUser._id)) {
                throw new common_1.BadRequestException('Email is already in use');
            }
        }
        const user = await this.userModel.findById(_id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        let newPassword;
        if (data.password && data.password.trim() !== '') {
            const salt = await (0, bcryptjs_1.genSalt)(10);
            newPassword = await (0, bcryptjs_1.hash)(data.password, salt);
        }
        const updateData = Object.assign({}, data);
        if (newPassword) {
            updateData.password = newPassword;
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(_id, updateData, { new: true }).exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('Failed to update user');
        }
    }
    async getFavoriteMovies(_id) {
        return await this.userModel
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
        return await this.userModel.find().count().exec();
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
        return await this.userModel
            .find(options)
            .select('-password -updatedAt -__v')
            .sort({ createdAt: 'desc' })
            .exec();
    }
    async delete(id) {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        const comment = await this.commentService.deleteByUserId(id);
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, comment_service_1.CommentService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map