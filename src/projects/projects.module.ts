import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ScammersController } from './scammers/scammers.controller';
import { ScammersService } from './scammers/scammers.service';
import { Scammer } from './scammers/scammer.entity';
import { DecisionRatesService } from './decision-rates/decision-rates.service';
import { DecisionRatesController } from './decision-rates/decision-rates.controller';
import { Decision } from './decision-rates/decision.entity';
import { Project } from './project.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Project, Scammer, Decision]),],
  providers: [ProjectsService, ScammersService, DecisionRatesService],
  controllers: [ProjectsController, ScammersController, DecisionRatesController]
})
export class ProjectsModule {}
