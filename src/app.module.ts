import { Module , ValidationPipe} from '@nestjs/common';
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from "./users/user.entity";
import { QuestionsModule } from './questions/questions.module';
import { Question } from './questions/question.entity';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'pass1234',
    database: 'decision-making',
    entities: [User, Question],
    synchronize: true,
  }),
    UsersModule,
    QuestionsModule,
    ProjectsModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }],
})
export class AppModule {}
