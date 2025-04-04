import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategy/jwtAuth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: "see all users" })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "see user's posts" })
  findUnique(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserPosts(id);
  }

  @Post()
  @ApiOperation({ summary: "create a user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: "delete the user" })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.removeUser(+id);
    return { message: `User with id ${id} has been deleted` }
  }
}
