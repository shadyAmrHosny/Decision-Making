import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ScammersService } from './scammers.service';
import { CreateScammerDto } from '../dtos/create-scammer.dto';
@Controller('scammers')
export class ScammersController {
  constructor(private scammersService: ScammersService) {}

  @Post()
  create(@Body() createScammerDto: CreateScammerDto) {
    return this.scammersService.create(createScammerDto);
  }

  @Get()
  findAll() {
    return this.scammersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.scammersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateScammerDto: CreateScammerDto,
  ) {
    return this.scammersService.update(id, updateScammerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.scammersService.remove(id);
  }

}
