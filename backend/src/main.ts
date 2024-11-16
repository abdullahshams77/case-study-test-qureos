import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./filters/http.exception.filter";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors();
  //PIPE_CHANGES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // for dto response transform
      transformOptions: {
        // for dto response transform //INTERCEPTOR_CHANGES
        enableImplicitConversion: true,
      },
    })
  );
  //HTTP_EXCEPTION_FILTER_CHANGES
  app.useGlobalFilters(new HttpExceptionFilter());
  //app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  //app.setBaseViewsDir(join(__dirname,'../../','client'));
  app.setViewEngine("hbs");

  // Ensure the default user exists

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
