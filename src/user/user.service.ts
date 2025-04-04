import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import { GetUserDto } from './dto/get-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}

  async createUser(createUserDto: CreateUserDto):Promise<CreateUserDto>{
    const hashedPassword = await bcrypt.hash(createUserDto.password,10);
    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: hashedPassword, 
      },
    }).catch((error) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          throw new ConflictException('This username exists');

      throw new InternalServerErrorException();
    });
  }

  async findUserPosts(id: number){
    return await this.prisma.user.findUnique({
      where: { id: id },
      include: { posts: true },
    })
    .then((user) =>{ 
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user.posts;
    })
  }

  async findAll():Promise<GetUserDto[]>{
  return await this.prisma.user.findMany();
  }

  async findUser(id: number):Promise<GetUserDto>{
    const useri = await this.prisma.user.findUnique({
      where: {id: id},
    });
    if (!useri) {
      throw new NotFoundException('ID is not found');
    }
    return useri;
  }

  async removeUser(id: number) {
    return await this.prisma.user.delete({
      where:{
        id: id,
      },
    }).catch((error) => {
      if(error instanceof Prisma.PrismaClientKnownRequestError)
        if (error.code === 'P2025')
          throw new NotFoundException('User not found');
      throw new InternalServerErrorException();
    });
  }


  // username, password, etc. for signin.
  async findOne(username: string){
    return this.prisma.user.findUnique({
      where: {username: username},
    });
  }
}
