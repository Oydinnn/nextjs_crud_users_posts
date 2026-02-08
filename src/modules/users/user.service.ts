import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'Ali', email: 'ali@example.com' },
    { id: 2, name: 'Vali', email: 'vali@example.com' },
    { id: 3, name: 'aali', email: 'aali@example.com'},
    { id: 4, name: 'hali', email: 'hali@example.com' },
    { id: 5, name: 'yyyli', email: 'yyyli@example.com' },
    { id: 6, name: 'Valik' },
    { id: 7, name: 'Alim' },
    { id: 8, name: 'Valim' },
  ];

  getAllUsers(query: GetUsersQueryDto) {
    const { page = 1, limit = 10, search } = query;

    let filtered = this.users;

    if (search) {
      filtered = filtered.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()),
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

  getUserById(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
  const user = this.users.find(u => u.id === id);
  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  if (updateUserDto.email && updateUserDto.email !== user.email) {
    const emailExists = this.users.some(u => u.email === updateUserDto.email);
    if (emailExists) {
      throw new ConflictException('Email already in use');
    }
  }

  Object.assign(user, updateUserDto);

  return user;
}

deleteUser(id: number) {
  const index = this.users.findIndex(u => u.id === id);
  if (index === -1) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  this.users.splice(index, 1);
  return; 
}
}