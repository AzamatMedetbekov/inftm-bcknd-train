
import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}

  async findAll(){
    return await this.prisma.post.findMany();
  }

  async updatePost(id: number, updatePostDTO: CreatePostDTO){
    return await this.prisma.post.update({
      where:{id: id},
      data:{
        title: updatePostDTO.title,
        content: updatePostDTO.content, 
      },
    })
  }

  async createPost(createPostDTO: CreatePostDTO) {
    return await this.prisma.post.create({
      data: {
        title: createPostDTO.title,
        content: createPostDTO.content, 
      },
    });
  }
  
  async findUser(id: number){
    return await this.prisma.user.findUnique({
      where: {id: id},
    });
  }

  async getPost(id: number) {
    return await this.prisma.post.findUnique({
      where: {id: id,},
    });
  }

  async deletePost(id: number){
    return await this.prisma.post.delete({
      where:{
        id: id,
      },
    });
  }
}

  
