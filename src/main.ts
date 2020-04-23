import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import register from '@react-ssr/nestjs-express/register';
import { AppModule } from './modules/app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { join } from "path";

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await register(app);
  const publicPath = join(__dirname, "..", "public");
  console.log(publicPath);
  app.useStaticAssets(publicPath);
  app.useGlobalFilters(new AllExceptionsFilter());

  app.listen(3000, "0.0.0.0", async () => {
    console.log(`> Ready on http://localhost:3000`);
  });
}
bootstrap();
