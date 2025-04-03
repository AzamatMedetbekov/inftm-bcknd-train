import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class GetUserDto {
@ApiProperty({ example: 'This is username' })
@IsNotEmpty()
readonly username: string;
}
