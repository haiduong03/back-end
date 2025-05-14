import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import utc from 'dayjs/plugin/utc' // ES 2015
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

dayjs.extend(utc);
dayjs.extend(timezone);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({ allowedHeaders: "*", origin: "*" });

  const config = new DocumentBuilder()
    .setTitle('Familymart API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
