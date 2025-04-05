import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PayloadDto {
  readonly sub: number;

  readonly username: string;
}