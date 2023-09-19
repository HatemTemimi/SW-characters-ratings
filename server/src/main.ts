import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = {
    origin: "http://localhost:5173",
    methods: "GET,POST,DELETE,PATCH,PUT",
  }
  app.enableCors(cors)
  await app.listen(3000);
}
bootstrap();
