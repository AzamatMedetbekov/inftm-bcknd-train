import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

@HttpCode(HttpStatus.OK)
@Post('login')
signIn(@Body() signInDto: SingInDto){
    return this.authService.signIn(signInDto.username, signInDto.password);
}



}
