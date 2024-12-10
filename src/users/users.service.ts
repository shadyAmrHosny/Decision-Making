import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto){
    const existingUser = await this.repo.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(`Email ${createUserDto.email} is already in use`);
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

   // const user = this.repo.create(createUserDto);
    const user = this.repo.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id){return null;}
    return this.repo.findOne({ where: { id } });
  }

  async findAll() {
    return this.repo.find();
  }
  async find(email: string){
    return  this.repo.findOne({ where: { email, is_active:true } });
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
