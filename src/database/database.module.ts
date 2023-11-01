import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
//ejm de inyectar un dato para poder utilizarlo en toda la aplicación
//lo voy a inyectar desde el arch --> app.service
const valor = '123';

//------para la conexion (saco la url de mongo compas)-------------------------------------------------------------


//creo funcion para q se conecte a dicha DB
/* async function run() {    
    
    console.log(tasks);
} */
//-----------fin conexion-----------------------------------------------------------------------------------------
@Global() //con esto todos los providers q declare SERAN GLOBALES
@Module({
    providers: [//declaro el provider 
        {
            provide: 'valor',
            useValue: valor, //utilizo useValue
        },
        //provider para la conexion
        {
            provide: 'MONGO',
            useFactory: async () => {
                const url = 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
                //creo instancia para cliente de mongo
                const client = new MongoClient(url);
                await client.connect();
                const database = client.db('platzi-store'); //aquí digo a q DB
                return database;
            }
        },
    ],
    
    //para poder utilizar el provider desd cualqr Modulo --> lo exporto
    exports: ['valor', 'MONGO']
})
export class DatabaseModule {}
