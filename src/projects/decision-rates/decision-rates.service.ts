import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Decision } from './decision.entity';
import { Repository } from 'typeorm';
import { CreateDecisionDto } from '../dtos/create-decision.dto';
import { UpdateDecisionDto } from '../dtos/update-decision.dto';

@Injectable()
export class DecisionRatesService {
  constructor(@InjectRepository(Decision) private repo: Repository<Decision>) {}

  async create(createDecisionDto: CreateDecisionDto){
    const decision= this.repo.create(createDecisionDto);
    return this.repo.save(decision);
  }

  async findAll(){
    return this.repo.find();
  }

  async findOne(id: number){
    if (!id){return null;}
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, updateDecisionDto: UpdateDecisionDto){
    const decision = await this.findOne(id);
    if (!decision){
      throw new NotFoundException('decision  not found')
    }
    Object.assign(decision,updateDecisionDto);
    return this.repo.save(decision);
  }

  async remove(id: number){
    const decision = await this.findOne(id);
    if (!decision){
      throw new NotFoundException('decision  not found')
    }
    return this.repo.remove(decision);
  }

}
