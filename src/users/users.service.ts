import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(createUserDto: CreateUserDto){
    const user = this.repo.create(createUserDto);

    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id){return null;}
    return this.repo.findOne({ where: { id } });
  }

  async findAll() {
    return this.repo.find();
  }

  async update(id: number, attrs: Partial<User>){
    const user = await this.findOne(id);
    if (!user){
      throw new NotFoundException('user not found')
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user){
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
