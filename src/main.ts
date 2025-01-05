import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    //origin: 'http://localhost:4200',
    origin: configService.get<string>('http://localhost:4200'),
    credentials:true,
  });

  app.use(morgan('dev'));


  // Enable graceful shutdown
  app.enableShutdownHooks();
  const port= configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
