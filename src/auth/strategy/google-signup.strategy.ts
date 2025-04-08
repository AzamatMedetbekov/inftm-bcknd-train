import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, StrategyOptions, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleSignUpStrategy extends PassportStrategy(Strategy, 'google-signup') {
  constructor(configService: ConfigService,) {
    super({
      clientID: configService.getOrThrow('GOOGLE_SIGNUP_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_SIGNUP_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GOOGLE_SIGNUP_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      email: profile.emails?.[0].value,
      googleId: profile.id,
      username: profile.displayName,
      password: profile.id,
    };
  }
}