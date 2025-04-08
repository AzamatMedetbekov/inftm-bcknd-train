import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class RegisterUserDto {

    @ApiProperty({ example: 'user@example.com' })
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ example: 'This is GoogleID' })
    @IsNotEmpty()
    readonly googleId: string;

    @ApiProperty({ example: 'Password' })
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({ example: 'This is username' })
    @IsNotEmpty()
    readonly username: string;
}
