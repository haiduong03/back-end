import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import utc from 'dayjs/plugin/utc' // ES 2015
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({ allowedHeaders: "*", origin: "*" });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
