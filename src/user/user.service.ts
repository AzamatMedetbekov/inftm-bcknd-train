import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SingInDto } from 'src/auth/dto/sign-in.dto';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password,10);
    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: hashedPassword, 
      },
    });
  }

  async findUserPosts(id: number) {
    return await this.prisma.user.findUnique({
      where: { id: id },
      include: { posts: true },
    });
  }

  async findAll() {
  return await this.prisma.user.findMany();
  }

  async findUser(id: number){
    return await this.prisma.user.findUnique({
      where: {id: id},
    });
  }

  async removeUser(id: number) {
    return await this.prisma.user.delete({
      where:{
        id: id,
      },
    });
  }

  async findOne(username: string) {
    return this.prisma.user.findUnique({
      where: {username: username},
    });
  }
}
