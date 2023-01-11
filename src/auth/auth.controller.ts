import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { AuthDto } from './dto/auth.dto'
import { AuthService } from './auth.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Login to the system' })
	@ApiResponse({
		status: 200,
		type: AuthService,
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() data: AuthDto) {
		return this.authService.login(data)
	}

	@ApiOperation({ summary: 'Refresh token' })
	@ApiResponse({ status: 200, type: AuthDto })
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(@Body() data: RefreshTokenDto) {
		// const sdt = await this.authService.getNewTokens(data)
		console.log(this.authService.getNewTokens(data))

		return this.authService.getNewTokens(data)
	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findByEmail(dto.email)
		if (oldUser)
			throw new BadRequestException(
				'User with this email is already in the system'
			)

		return this.authService.register(dto)
	}
}
