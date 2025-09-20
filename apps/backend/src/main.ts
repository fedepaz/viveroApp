import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('config.port') || 3001;

  await app.listen(port);
  console.log(
    `🚀 Backend is running hoot Yeah!!! on: http://localhost:${port}`,
  );
}
bootstrap();
