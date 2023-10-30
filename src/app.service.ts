import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  //creo el constructor
  constructor(
    @Inject('valor') private val: string, 
    @Inject('TAREAS') private tareas: any[]
  ) {}

  getHello(): string {
    //imprimo el array por la terminal
    console.log("tareas: ", this.tareas);
    return `Mostrando el valor ${this.val} inyectado Y q quieremos q se utice a través de toda la aplicación`;
  }
}
