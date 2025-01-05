import { Module , ValidationPipe, MiddlewareConsumer} from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import * as cookieSession from 'cookie-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>({
        type:'mysql',
        host:configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      })
    }),
    UsersModule,
    QuestionsModule,
    ProjectsModule,
    AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
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
