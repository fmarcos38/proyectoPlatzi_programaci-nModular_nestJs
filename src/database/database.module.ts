import { Global, Module } from '@nestjs/common';

//ejm de inyectar un dato para poder utilizarlo en toda la aplicación
//lo voy a inyectar desde el arch --> app.service
const valor = '123';

@Global() //con esto todos los providers q declare SERAN GLOBALES
@Module({
    providers: [//declaro el provider 
        {
            provide: 'valor',
            useValue: valor, //utilizo useValue
        },
    ],
    //para poder utilizar el provider desd cualqr Modulo --> lo exporto
    exports: ['valor']
})
export class DatabaseModule {}
