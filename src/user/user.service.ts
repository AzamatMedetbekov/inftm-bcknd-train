import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({});
  }

  async findAll() {
  return await this.prisma.user.findMany();
  }

  async findUser(id: number){
    return await this.prisma.user.findUnique({
      where: {id: id},
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where:{
        id: id,
      },
    });
  }
}
