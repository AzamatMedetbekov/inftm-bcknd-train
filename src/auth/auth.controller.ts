import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './strategy/jwtAuth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  @Get('signup')
  @UseGuards(AuthGuard('google-signup'))
  async googleAuthSignUp() {
  }
  
  @Get('signup/callback')
  @UseGuards(AuthGuard('google-signup'))
  async googleAuthSignUpCallback(@Req() req, @Res() res) {
    const { email, googleId, username } = req.user;
    await this.authService.googleOAuthSignUp({
      email,
      username,
      googleId,
      password: googleId, 
    });
    return res.redirect('/auth/signin');
  }

  @Get('signin')
  @UseGuards(AuthGuard('google-signin'))
  async googleAuthSignIn() {
  }

  @Get('signin/callback')
  @UseGuards(AuthGuard('google-signin'))
  async googleAuthSignInCallback(@Req() req, @Res() res) {
    const { email, googleId, username } = req.user;
    const tokens = await this.authService.googleOAuthLogin({
      email,
      username,
      googleId,
      password: googleId,
    });

    return res.json(tokens);
  }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto.username, signInDto.password);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('refresh')
    async refreshToken(@Body() refreshToken: RefreshTokenDto) {
        return await this.authService.refreshToken(refreshToken.refreshToken);
    }
}
