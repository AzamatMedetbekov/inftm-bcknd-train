
import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
interface Post {
  title: string;
  content: string;
}

@Injectable()
export class PostService {
  private readonly posts: Post[] = [];

  async createPost(post) {
    this.posts.push(post);
    return this.posts;
  }

  async getPost() {
    return this.posts;
  }

  async deletePost(){
    
    }


}

  
