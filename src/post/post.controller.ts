import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdatePostDTO } from './dto/update-post.dto';

@Controller('post')
export class PostController {
    constructor(private PostService: PostService){}

    @Get()
    @ApiOperation({ summary: 'get posts' })
    findAll() {
    return this.PostService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'get a post using id' })
    findOne(@Param('id', ParseIntPipe) id:number) {
        return this.PostService.getPost(+id);
    }

    @Get(':authorId')
    @ApiOperation({ summary: 'get a post using user id' })
    findUnique(@Param('authorId', ParseIntPipe) authorId:number) {
        return this.PostService.findPostsByUser(authorId);
    }

    @Post()
    @ApiOperation({ summary: 'create a post' })
    create(@Body() createPostDTO: CreatePostDTO) {
    return this.PostService.createPost(createPostDTO);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete the post using id' })
    async delete(@Param('id', ParseIntPipe) id: number) {
    await this.PostService.deletePost(+id);  
    return { message: `Post with id ${id} has been deleted` };  
}


    @Patch(':id')
    @ApiOperation({ summary: 'update the post using id' })
    async update(@Param('id', ParseIntPipe) id:number,@Body() updatePostDTO: UpdatePostDTO) {
    await this.PostService.updatePost(+id, updatePostDTO);
    return {message: `Post with id ${id} has been updated`}
    }
}