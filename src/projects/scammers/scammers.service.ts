import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scammer } from './scammer.entity';
import { CreateScammerDto } from '../dtos/create-scammer.dto';

@Injectable()
export class ScammersService {
  constructor(@InjectRepository(Scammer) private repo :Repository<Scammer>) {}

  async create (createScammerDto: CreateScammerDto){
    const scammer=  this.repo.create(createScammerDto);
    return this.repo.save(scammer);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const scammer = await this.repo.findOne({ where: { id } });
    if (!scammer) {
      throw new NotFoundException(`Scammer with ID ${id} not found`);
    }
    return scammer;
  }

  async update(id: number, updateScammerDto: CreateScammerDto): Promise<Scammer> {
    const scammer = await this.findOne(id);
    Object.assign(scammer, updateScammerDto);
    return this.repo.save(scammer);
  }

  async remove(id: number): Promise<void> {
    const scammer = await this.findOne(id);
    await this.repo.remove(scammer);
  }

}
