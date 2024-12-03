import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { Question } from './question.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  async findAll() {
    return this.questionsService.findAll();
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
