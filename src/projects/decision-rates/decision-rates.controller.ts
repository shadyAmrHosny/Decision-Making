import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DecisionRatesService } from './decision-rates.service';
import { CreateDecisionDto } from '../dtos/create-decision.dto';
import { UpdateDecisionDto } from '../dtos/update-decision.dto';

@Controller('decisions')
export class DecisionRatesController {
  constructor(private decisionService: DecisionRatesService) {}

  @Post()
  create(@Body() createDecisionRateDto: CreateDecisionDto) {
    return this.decisionService.create(createDecisionRateDto);
  }

  @Get()
  findAll() {
    return this.decisionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.decisionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDecisionDto: UpdateDecisionDto) {
    return this.decisionService.update(id, updateDecisionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.decisionService.remove(id);
  }
}
