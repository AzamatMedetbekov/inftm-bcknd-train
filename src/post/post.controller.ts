import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('post')
export class PostController {

    @Get()
    findAll() {
        
    }

    @Get(':id')
    findOne() {
        return "This returns a song based on id";
    }

    @Post()
    create(): string {
        return "This creates a post";
    }

    @Delete(':id')
    delete() {
        return "this deletes a post based on id";
    }

    @Patch(':id')
    update() {
        return "this updates the post based on id";
    }
}