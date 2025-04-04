import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './strategy/jwtAuth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Post('refresh')
    async refreshToken(@Body('refreshToken') refreshToken: string) {
        return await this.authService.refreshToken(refreshToken);
    }
}
