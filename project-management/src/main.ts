import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from 'fs';
import { stringify } from 'yaml';
import { BadRequestException, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Project management')
    .setDescription('Project API description')
    .setVersion('1.0')
    .addTag('project')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const yamlDoc: string = stringify(document, {});
  writeFileSync('swagger.yml', yamlDoc);
  app.enableCors({
    origin: 'http://localhost:3001',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,OPTIONS, PUT,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (errors) => {
        const firstError = errors[0];
        return new BadRequestException(firstError.constraints[Object.keys(firstError.constraints)[0]]);
      },
    })
  );

  await app.listen(3000);
}
bootstrap();
