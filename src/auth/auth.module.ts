import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './strategy/jwtAuth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtAuthGuard,JwtStrategy],
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
