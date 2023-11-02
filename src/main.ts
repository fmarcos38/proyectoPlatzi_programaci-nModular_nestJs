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
      transformOptions: { //para la paginacion -> Convertir Query Params a números entero
        enableImplicitConversion: true,
      },
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

  //con esta directiva desHabilito los cors, para q al deployar se le pueda enviar peticiones desde cualq soft(ya sea un froned, o app android) fuera del dominio donde se haga el deployment
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
