import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { GetUser } from '../decorators/get-user.decrator';
import { User } from '../users/user.entity';
import { CreateQuestionTreeDto } from './dtos/create-question-tree.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto,@GetUser() currentUser:User) {
    return this.questionsService.create(createQuestionDto,currentUser);
  }

  @Get()
  async findAll(@Query('all') all: boolean) {
    return this.questionsService.findAll(all);
  }

  @Post('tree')
  async createQuestionsTree(@Body() questionTree: CreateQuestionTreeDto[]){
    return this.questionsService.createQuestionsTree(questionTree);
  }


  @Get(':id')
  async findOne(@Param('id') id: number) {
    const question = await this.questionsService.findOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  @Get('/:id/children')
  async getQuestionWithChildren(@Param('id') id: number): Promise<any> {
    return await this.questionsService.findQuestionWithChildren(id);
    }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ){
    return this.questionsService.update(id, updateQuestionDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.questionsService.remove(id);
  }
}
