import { HttpService, HttpModule,Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

//---------para versiones 8 o + ----------------------------------------------
//import { HttpService, HttpModule } from @nestjs/axios; //tamb instalar axios
//import { lastValueFrom } from 'rxjs';
//------fin v 8---------------------------------------------------------------

//ejm de inyectar un dato para poder utilizarlo en toda la aplicación
//lo voy a inyectar desde el arch --> app.service
const valor = '123';

@Module({
  imports: [UsersModule, ProductsModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    //declaro el provider 
    {
      provide: 'valor',
      useValue: valor, //utilizo useValue
    },
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
