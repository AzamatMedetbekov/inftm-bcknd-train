import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
@IsNotEmpty()
@ApiProperty({ example: 'this is User ID' })
readonly id: number;
}
