import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:'*'
  });

  app.use(morgan('dev'));


  // Enable graceful shutdown
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
