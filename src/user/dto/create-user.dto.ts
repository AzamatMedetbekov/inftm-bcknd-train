import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
@ApiProperty({ example: 'this is User ID' })
readonly id: number;
}
