import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';
import { CreatePostDto } from './dto/post.create.dto';
import { UpdatePostDto } from './dto/update.post.dto';

@Injectable()
export class PostService {
  private posts = [
    { id: 1, title: 'Birinchi post', content: 'Salom dunyo' },
    { id: 2, title: 'Ikkinchi post', content: 'NestJS haqida' },
    { id: 3, title: 'uchinchi post', content: 'Salom dunyo' },
    { id: 4, title: 'turtinchi post', content: 'NestJS haqida' },
  ];

  async getAll(){
    return this.posts
  }
  

  getAllPosts(query: GetPostsQueryDto) {
    const { page = 1, limit = 10, search } = query;

    let filtered = this.posts;

    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      data: paginated,
      total: filtered.length,
      page,
      limit,
    };
  }

  getPostById(id: number) {
    const post = this.posts.find(p => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  createPost(createPostDto: CreatePostDto) {
    const { title } = createPostDto;

    const existingPost = this.posts.find(p => p.title === title);
    if (existingPost) {
      throw new ConflictException('post already exists');
    }

    const newPost = {
      id: this.posts.length + 1,
      ...createPostDto,
    };

    this.posts.push(newPost);
    return newPost;
  }

updatePost(id: number, updatePostDto: UpdatePostDto) {
  const index = this.posts.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new NotFoundException(`Post with id ${id} not found`);
  }

  this.posts[index] = { ...this.posts[index], ...updatePostDto };
  return this.posts[index];
}

deletePost(id:number){
  const index = this.posts.findIndex(p => p.id === id)
  if(index === -1){
    throw new NotFoundException(`Post with id ${id} not found`)
  }
  this.posts.splice(index, 1)
  return
}
}
