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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("../user/user.model");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const jdenticon = require("jdenticon");
let AuthService = class AuthService {
    constructor(userModel, jwtService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_SECRET_KEY'),
        });
    }
    async login({ email, password }) {
        const user = await this.validateUser(email, password);
        const tokens = await this.issueTokenPair(String(user._id));
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    async register({ email, password }) {
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const png = jdenticon.toPng(email, 200);
        const pngString = png.toString('base64');
        const cloudinaryResponse = await cloudinary_1.v2.uploader.upload(`data:image/png;base64,${pngString}`, {
            folder: 'space-cinema/avatars',
            public_id: `${email}_${Date.now()}`,
        });
        const newUser = new this.userModel({
            email,
            userName: email,
            avatar: cloudinaryResponse.url,
            password: await (0, bcryptjs_1.hash)(password, salt),
        });
        const user = await newUser.save();
        const tokens = await this.issueTokenPair(String(user._id));
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    async getNewTokens({ refreshToken }) {
        if (!refreshToken)
            throw new common_1.UnauthorizedException('Please sign in!');
        const result = await this.jwtService.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid token or expired!');
        const user = await this.userModel.findById(result._id);
        const tokens = await this.issueTokenPair(String(user._id));
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    async findByEmail(email) {
        return await this.userModel.findOne({ email }).exec();
    }
    async validateUser(email, password) {
        const user = await this.findByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const isValidPassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isValidPassword)
            throw new common_1.UnauthorizedException('Invalid password');
        return user;
    }
    async issueTokenPair(userId) {
        const data = { _id: userId };
        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '15d',
        });
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '1h',
        });
        return { refreshToken, accessToken };
    }
    returnUserFields(user) {
        return {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map