import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { ScammersService } from './scammers/scammers.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User } from '../users/user.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private repo: Repository<Project>,
    private scammerService: ScammersService
  ) {}

  async create(createProjectDto: CreateProjectDto, user:User){
    let scammer=false
    if (await this.scammerService.find(createProjectDto.client_name)){
      scammer=true;
    }
    const project= this.repo.create({
      ...createProjectDto,
      scammer,
      created_by:user,
    });

    return this.repo.save(project);
  }

  async findAll(){
    return this.repo.find({
      //relations:['created_by']
    });
  }

  async findOne(id: number){
    const project= await this.repo.findOne({
      where:{id},
      //relations:['created_by']
    })

    if (!project){
      throw new NotFoundException(`Project with ID ${id} not found`)
    }

    return project;
  }

  async update(id: number, updateProjectDto:UpdateProjectDto){
    const project=await this.findOne(id);
    Object.assign(project, updateProjectDto);
    return this.repo.save(project);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    await this.repo.remove(project);
  }


}
