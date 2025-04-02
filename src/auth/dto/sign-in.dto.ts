import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SingInDto {
@ApiProperty({ example: 'This is username' })
@IsNotEmpty()
readonly username: string;

@ApiProperty({ example: 'Enter password' })
@IsNotEmpty()
readonly password: any;
}
