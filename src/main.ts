import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle("Goal Tracker API")
    .setDescription("API built in NestJS")
    .setVersion("1.0.0")
    .setContact(
      "Tg Channel",
      "https://t.me/gem_devbackend",
      "iskandar.django.work@gmail.com",
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
