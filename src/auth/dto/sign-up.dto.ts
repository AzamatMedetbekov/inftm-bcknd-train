import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class SignUpDto {

    @ApiProperty({ example: 'This is username' })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: 'Create User - password' })
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({ example: 'Refresh Token' })
    @IsOptional()
    readonly refreshToken: string;
}
