import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcryptjs";
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResDto } from './dto/res.dto';
import { ConfigService } from '@nestjs/config';
import { PayloadDto } from './dto/playload.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';


@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private prisma: PrismaService,
    ) { }

    async signIn(username: string, pass: string): Promise<LoginResDto> {
        const user = await this.userService.findOne(username);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(pass, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRE'),
        })
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
        })

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await this.userService.saveRefreshToken(user.id, refreshToken, expiresAt);

        return {
            accessToken,
            refreshToken,
        }
    };

    async googleOAuthSignUp(googleUser: {
        email: string;
        username: string;
        googleId: string;
        password: string;
    }
    ): Promise<void> {
        const hashedPassword = await bcrypt.hash(googleUser.password, 10);
        const existingUser = await this.prisma.user.findUnique({
            where: { email: googleUser.email 
            },
          });
          if (existingUser) {
            throw new BadRequestException('User with this email already exists');
          }
        const user = await this.userService.registerUser({
            email: googleUser.email,
            googleId: googleUser.googleId,
            username: googleUser.username,
            password: hashedPassword, 
             
        });
    }

    async googleOAuthLogin(googleUser: {
        email: string;
        username: string;
        googleId: string;
        password: string;
    }): Promise<LoginResDto> {
        let user = await this.prisma.user.findUnique({
            where: { email: googleUser.email },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const payload = { sub: user.id, username: user.username };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRE'),
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
        });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.userService.saveRefreshToken(user.id, refreshToken, expiresAt);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload: PayloadDto & { iat } & { exp } = this.jwtService.verify(
                refreshToken,
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                },
            );

            delete payload.iat;
            delete payload.exp;

            const isInDb = await this.userService.findRefreshToken(payload.sub, refreshToken);
            if (!isInDb) throw new BadRequestException('Refresh token not found');

            const user = await this.userService.findUser(payload.sub);

            if (!user) throw new NotFoundException();

            const accessToken = this.jwtService.sign(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: this.configService.get<string>('JWT_EXPIRE'),
            });

            const newRefreshToken = this.jwtService.sign(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
            });

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            await this.userService.saveRefreshToken(user.id, newRefreshToken, expiresAt);

            return {
                accessToken: accessToken,
                refreshToken: newRefreshToken,
            };
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}