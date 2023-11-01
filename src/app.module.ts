import { HttpService, HttpModule,Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config'; //para variables de entorno
import { enviroments } from './enviroments'; //para variables de entorno DINAMICO(segun ambiente)
//import * as Joi from 'joi';

//---------para versiones 8 o + ----------------------------------------------
//import { HttpService, HttpModule } from @nestjs/axios; //tamb instalar axios
//import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import config from 'config';
//------fin v 8---------------------------------------------------------------


@Module({
  imports: [
    UsersModule, 
    ProductsModule, 
    HttpModule, 
    DatabaseModule, 
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', //le especifico q arch tiene q leer
      load: [config], //le especifico q archivo debe utilizar ES eL Q cree YO
      isGlobal: true,
      /* validationSchema: Joi.object({
        DATABASE_NAME: Joi.string().required,
        VALOR: Joi.number().required,
      }) */ //validaciones para las variables de ambiente
    }) 
  ],
  controllers: [AppController],
  providers: [
    AppService,    
    //ejem de useFactoy conexion con Apis/DB version 7 nestJs
    {
      provide: 'TAREAS', //me va a servir para crear un array de tareas
      useFactory: async (http: HttpService) => {
        const tareas = await http.get('https://jsonplaceholder.typicode.com/todos').toPromise();
        //para v 8 o +
        //const request = http.get('https://jsonplaceholder.typicode.com/todos');
        //const tareasS = await lastValueFrom(request);
        return tareas.data;
      },
      inject: [HttpService]
    }    
  ],
})
export class AppModule {}
