import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(logger);
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Listening on port ${port}`);
}
bootstrap();
