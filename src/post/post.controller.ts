import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ApiOperation } from '@nestjs/swagger';

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
    findOne(@Param('id') id:string) {
        return this.PostService.getPost(+id);
    }

    @Get(":id")
    @ApiOperation({ summary: 'get user using id' })
    findUnique(@Param('id') id:string){
        return this.PostService.findUser(+id);
    }

    @Post()
    @ApiOperation({ summary: 'create a post' })
    create(@Body() createPostDTO: CreatePostDTO) {
    return this.PostService.createPost(createPostDTO);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete the post using id' })
    async delete(@Param('id') id: string) {
    await this.PostService.deletePost(+id);  
    return { message: `Post with id ${id} has been deleted` };  
}


    @Patch(':id')
    @ApiOperation({ summary: 'update the post using id' })
    async update(@Param('id') id:string,@Body() updatePostDTO: CreatePostDTO) {
    await this.PostService.updatePost(+id, updatePostDTO);
    return {message: `Post with id ${id} has been updated`}
    }
}
