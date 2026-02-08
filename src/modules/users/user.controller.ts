import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  NotFoundException,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { UserParamDto } from './dto/user-param.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users   barcha userlar (pagination + search bilan)
  @Get()
  @HttpCode(200)
  getAllUsers(@Query() query: GetUsersQueryDto) {
    return this.userService.getAllUsers(query);
  }

  // GET /users/:id  
  @Get(':id')
  @HttpCode(200)
  getUserById(@Param() params: UserParamDto) {
    return this.userService.getUserById(params.id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Param() params: UserParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(params.id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() params: UserParamDto) {
    return this.userService.deleteUser(params.id);
  }
}