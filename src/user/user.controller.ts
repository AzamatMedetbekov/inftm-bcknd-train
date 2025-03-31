import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: "create a user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "see all users" })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: 'get user using id' })
  findUnique(@Param('id', ParseIntPipe) id: number) {
  return this.userService.findUser(+id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
  await this.userService.remove(+id);
  return {message: `User with id ${id} has been deleted`}
  }
}
