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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const comment_model_1 = require("./comment.model");
let CommentService = class CommentService {
    constructor(CommentModel) {
        this.CommentModel = CommentModel;
    }
    async byMovieId(movieId) {
        const comments = await this.CommentModel
            .find({ movie: movieId }, '-__v')
            .sort({ createdAt: 'desc' })
            .populate('user', 'userName avatar email');
        return comments;
    }
    async create(userId, dto) {
        const { message, movieId } = dto;
        const newComment = await this.CommentModel.create({
            message,
            movie: movieId,
            user: userId,
        });
        return newComment;
    }
    async delete(commentId) {
        const deletedComment = await this.CommentModel.findByIdAndDelete(commentId);
        return deletedComment;
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(comment_model_1.CommentModel)),
    __metadata("design:paramtypes", [Object])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map