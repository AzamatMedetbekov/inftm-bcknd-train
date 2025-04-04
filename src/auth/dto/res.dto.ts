import { ApiProperty } from "@nestjs/swagger";

export class LoginResDto {
    @ApiProperty({
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX9.eyJzdWIiOiJqb2huZG9lQGdtLmdpc3QuYWMua3IiLCJpYXQiOjE2MzIwNzIwMzYsImV4cCI6MTYzMjA3MjA5Nn0.',
      description: 'access token',
    })
    accessToken: string;

    @ApiProperty({
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX9.eyJzdWIiOiJqb2huZG9lQGdtLmdpc3QuYWMua3IiLCJpYXQiOjE2MzIwNzIwMzYsImV4cCI6MTYzMjA3MjA5Nn0.',
      description: 'refresh token',
    })
    refreshToken: string;
  }