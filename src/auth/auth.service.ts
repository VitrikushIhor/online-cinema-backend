import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash, compare } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { AuthDto } from './dto/auth.dto'
import { UserModel } from '../user/user.model'
import { ConfigService } from '@nestjs/config'
import { v2 as cloudinary } from 'cloudinary';
import * as jdenticon from 'jdenticon';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {
		cloudinary.config({
			cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
			api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
			api_secret: this.configService.get<string>('CLOUDINARY_SECRET_KEY'),
		});
	}

	async login({ email, password }: AuthDto) {
		const user = await this.validateUser(email, password)

		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async register({ email, password }: AuthDto) {
		const salt = await genSalt(10)

		const png = jdenticon.toPng(email, 200)
		const pngString = png.toString('base64');

		const cloudinaryResponse = await cloudinary.uploader.upload(`data:image/png;base64,${pngString}`, {
			folder: 'space-cinema/avatars',
			public_id: `${email}_${Date.now()}`,
		});

		const newUser = new this.userModel({
			email,
			userName : email,
			avatar:cloudinaryResponse.url,
			password: await hash(password, salt),
		})
		const user = await newUser.save()

		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) throw new UnauthorizedException('Please sign in!')

		const result = await this.jwtService.verifyAsync(refreshToken)

		if (!result) throw new UnauthorizedException('Invalid token or expired!')

		const user = await this.userModel.findById(result._id)

		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async findByEmail(email: string) {
		return await this.userModel.findOne({ email }).exec()
	}

	async validateUser(email: string, password: string): Promise<UserModel> {
		const user = await this.findByEmail(email)
		if (!user) throw new UnauthorizedException('User not found')

		const isValidPassword = await compare(password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return user
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d',
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1h',
		})

		return { refreshToken, accessToken }
	}

	returnUserFields(user: UserModel) {
		return {
			_id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		}
	}
}
