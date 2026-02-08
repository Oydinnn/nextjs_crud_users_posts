import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';
import { PostParamDto } from './dto/post-param.dto';
import { CreateUserDto } from '../users/dto/user.create.dto';
import { CreatePostDto } from './dto/post.create.dto';
import { UpdatePostDto } from './dto/update.post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @Get("all")
  getAll(@Req() req : Request){
    return this.postService.getAll();
  }

  @Get()
  @HttpCode(200)
  getAllPosts(@Query() query: GetPostsQueryDto) {
    return this.postService.getAllPosts(query);
  }

  @Get(':id')
  @HttpCode(200)
  getPostById(@Param() params: PostParamDto) {
    return this.postService.getPostById(params.id);
  }

  @Post()
  @HttpCode(201)
  createPost(@Body() createPostDto: CreatePostDto) {
   return this.postService.createPost(createPostDto);
  }

  @Put(':id')
  @HttpCode(200)
  updatePost(
    @Param() params: PostParamDto,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(params.id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deletePost(@Param() params: PostParamDto) {
    return this.postService.deletePost(params.id);
  }

}