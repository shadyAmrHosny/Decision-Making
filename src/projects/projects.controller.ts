import { Controller, Post, Get, Patch, Delete, Param, Body} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { GetUser } from '../decorators/get-user.decrator';
import { User } from '../users/user.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: User
  ){
    return this.projectService.create(createProjectDto,user);
  }

  @Get()
  async getAllProjects(){
    return this.projectService.findAll();
  }

  @Get(':id')
  async getProject(@Param('id') id: number){
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  async updateProject(
    @Param('id') id:number,
    @Body() updateProjectDto: UpdateProjectDto,
    ){
    return this.projectService.update(id,updateProjectDto)
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number) {
    await this.projectService.remove(id);
    return { message: `Project with ID ${id} has been deleted.` };
  }

}
