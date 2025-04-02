import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcryptjs";
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
    ){}

 async signIn(username:string, pass:string): Promise<any>{
    const user = await this.userService.findOne(username);
    if(!user){
        throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(pass,user.password)
    if(!isPasswordValid){
        throw new UnauthorizedException();
    }
    const payload = {sub: user.id, username: user.username};
    return{
        access_token: await this.jwtService.signAsync(payload),
    };
 }

 
}

