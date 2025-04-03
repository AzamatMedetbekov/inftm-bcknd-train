import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
@ApiProperty({ example: 'this is User ID' })
readonly id: number;

@ApiProperty({ example: 'This is username' })
@IsNotEmpty()
readonly username: string;

@ApiProperty({ example: 'Create User - password' })
@IsNotEmpty()
readonly password: string;
}
