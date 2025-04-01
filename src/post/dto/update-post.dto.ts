import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDTO {

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'this is title' })
  readonly title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'this is content' })
  readonly content: string;
  
}