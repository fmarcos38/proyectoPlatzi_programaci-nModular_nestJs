import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'config'; //arch creado por mí
//voy a tipar el tipo de dato q inyect para la DB
import { Db } from 'mongodb';

@Injectable()
export class AppService {

  //creo el constructor
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>, //forma de invocar el arch config.ts PARA utilizar sus declaracions
    @Inject('TAREAS') private tareas: any[],
    @Inject('MONGO') private database: Db //inyect la DB mongo
  ) {}

  //metodo global
  getHello(): string {
    //imprimo el array por la terminal
    //console.log("tareas: ", this.tareas); //muetra las tareas q vienen de la API
    //const val = this.configService.valor;//de esta forma NO me puedo equivocar al llamar la variable de entorno
    //return `Mostrando el valor ${val} inyectado de forma global`;
    return `Mostrando el valor inyectado de forma global`;
  }

  //metodo global para traerme las TASKS de la DB
  //este servicio LO tengo q conectar a un CONTROLADOR
  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
