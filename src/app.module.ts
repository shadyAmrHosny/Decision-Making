import { Module , ValidationPipe, MiddlewareConsumer} from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
//import * as cookieSession from 'cookie-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from "./users/user.entity";
import { QuestionsModule } from './questions/questions.module';
import { Question } from './questions/question.entity';
import { ProjectsModule } from './projects/projects.module';
import { Scammer } from './projects/scammers/scammer.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

const cookieSession = require('cookie-session');

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'pass1234',
    database: 'decision-making',
   // entities: [User, Question,Scammer],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    UsersModule,
    QuestionsModule,
    ProjectsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }

  ],
})
export class AppModule {

  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          // name: 'session', // Cookie name
          signed: false,
          httpOnly: true,  // Prevent client-side JavaScript access
          secure: false,   // Use secure cookies in production
         // sameSite:'lax',
          maxAge: 24 * 60 * 60 * 1000, // 2 hours in milliseconds
        //  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }),
      )
      .forRoutes('*');
  }
}
