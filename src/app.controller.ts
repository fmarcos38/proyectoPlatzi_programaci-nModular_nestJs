import { Controller, Get, Param, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@UseGuards() //al declararlo AQUÍ TODOs los endpoint tendrían q enviar en su header la apikey
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@SetMetadata('isPlubic', true) //decorador para hacerlo publico Q ya viene en nestjs/common
  @Public() //decorador q hace lo mismo del de arriba PERO lo desarrollamos nosotros(osea es personalizado)
  @Get() //http://localhost:3000/
  getHello(): string {
    return this.appService.getHello(); //cambio al service q muestra el dato valor
  }

  @SetMetadata('isPlubic', true) //con este decorador Hago publico el endpoint(osea es como q evita el guardian )
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  //controlador para el servicio Q trae la colleccion Tasks de la DB mongo
  @Get('/tasks/')
  getTasks() {
      return this.appService.getTasks();
  }
}
