import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import config from 'config'; //para obtener las variables de entorno YA tipadas
import { ConfigType } from '@nestjs/config'; //tamb para el manejo de las variables de entorno(LO uso en useFactory)
import { MongooseModule } from '@nestjs/mongoose'; //para conexion con mongoose

//ejm de inyectar un dato para poder utilizarlo en toda la aplicación
//lo voy a inyectar desde el arch --> app.service
const valor = '123';

@Global() //con esto todos los providers q declare SERAN GLOBALES
@Module({
    imports: [
        MongooseModule.forRootAsync({ //conexion con mongoose
            useFactory: (configService: ConfigType<typeof config>) => { //utilizo useFactory (YA q recibe inyeccion de dependencias)
                const { connection, user, password, host, port, dbName, } = configService.mongo;
                return {
                    uri: `${connection}://${host}:${port}`,
                    user,
                    pass: password,
                    dbName,
                };
            },
            inject: [config.KEY],
            }),
    ],
    providers: [//declaro el provider 
        {
            provide: 'valor',
            useValue: valor, //utilizo useValue
        },
        //provider para la conexion
        {
            provide: 'MONGO',
            useFactory: async (configService: ConfigType<typeof config>) => {
                //hago destrucuting del parametro creado para la funcion de useFactory
                const {connection, user, password, host, port} = configService.mongo;
                /*ejemplo SIN variables de entorno
                const url = 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT'; */
                const url = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`
                //creo instancia para cliente de mongo
                const client = new MongoClient(url);
                await client.connect();
                const database = client.db('platzi-store'); //aquí digo a q DB
                return database;
            },
            inject: [config.KEY]
        },
    ],
    
    //para poder utilizar el provider desd cualqr servicio de forma global --> lo exporto
    exports: ['valor', 'MONGO', MongooseModule]
})
export class DatabaseModule {}
