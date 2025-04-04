
import { Injectable, InternalServerErrorException, Request } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}

  async findAll():Promise<UpdatePostDTO[]>{
    return await this.prisma.post.findMany();
  }

  async findPostsByUser(id: number):Promise<UpdatePostDTO[]> {
    return await this.prisma.post.findMany({
      where: {
        authorId: id,
      },
    }).then((posts) => {
      if(!posts) throw new Error('Posts with this user id is not found');
      return posts;
    });
  }

  async updatePost(id: number, updatePostDTO: UpdatePostDTO):Promise<UpdatePostDTO>{
    return await this.prisma.post.update({
      where:{id: id},
      data:{
        title: updatePostDTO.title,
        content: updatePostDTO.content, 
      },
    }).catch((err) => {
      if(err instanceof PrismaClientKnownRequestError)
        if(err.code === 'P2025')
          throw new Error('Post with this id is not found');
      throw new InternalServerErrorException();
    });
  }

  async createPost(createPostDTO: CreatePostDTO):Promise<CreatePostDTO>{
    return await this.prisma.post.create({
      data: {
        title: createPostDTO.title,
        content: createPostDTO.content, 
        authorId: createPostDTO.authorId,
      },
    });
  }

  async getPost(id: number){
    return await this.prisma.post.findUnique({
      where: {id: id,},
    }).then((post) => {
      if(!post) throw new Error('Post with this id is not found');
      return post;
    });
  }

  async deletePost(id: number){
    return await this.prisma.post.delete({
      where:{
        id: id,
      },
    }).catch((err) => {
      if(err instanceof PrismaClientKnownRequestError)
        if(err.code === 'P2025')
          throw new Error('Post with this id is not found');
      throw new InternalServerErrorException();
    });
  }
}

  
