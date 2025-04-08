import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './strategy/jwtAuth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleSignInStrategy } from './strategy/google-siginin.strategy';
import { GoogleSignUpStrategy } from './strategy/google-signup.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtAuthGuard,JwtStrategy, GoogleSignInStrategy, GoogleSignUpStrategy, PrismaService],
  imports: [UserModule, ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRE'),
          algorithm: 'HS256',
        }
      }),
    }),
  ],
  exports: [AuthService],
})
export class AuthModule { }
