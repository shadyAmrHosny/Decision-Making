import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ScammersController } from './scammers/scammers.controller';
import { ScammersService } from './scammers/scammers.service';
import { Scammer } from './scammers/scammer.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Scammer]),],
  providers: [ProjectsService, ScammersService],
  controllers: [ProjectsController, ScammersController]
})
export class ProjectsModule {}
