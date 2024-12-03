import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './question.entity';
@Module({
  imports: [ TypeOrmModule.forFeature([Question]), CacheModule.register()],
  providers: [QuestionsService],
  controllers: [QuestionsController]
})
export class QuestionsModule {}
