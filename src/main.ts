import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('Platzi API') //titulo q le pongo YO
    .setDescription('Documentación Platzi API') //descrip q le pongo YO
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  // URL API --> es el endpoint donde va a estar la documentacion
  SwaggerModule.setup('docs', app, document);


  await app.listen(3000);
}
bootstrap();
