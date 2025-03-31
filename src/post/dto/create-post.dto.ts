import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDTO {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'this is title' })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'this is content' })
  readonly content: string;

  @IsNotEmpty()
  @ApiProperty({example: 'authorId' })
  readonly authorId: number;
}