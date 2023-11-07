import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

import { UsersService } from 'src/users/services/users.service';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {

    //para poder inyectarlo desd el constructor 1ro lo importo en el arch --> auth.module.ts (esto para UserService)
    //el 2do param directamnt lo import desde aqui.
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    //creo metodo q recibe el email y la pass
    async validateUser(email: string, password: string) {
        //busco por email
        const user = await this.userService.findByEmail(email);        

        //si es correcta
        if(user) {
            //corroboro q la pass q viene del front sea igaul a la de la DB
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const { password, ...rta } = user.toJSON(); //quito el password para la respuiesta q mando al front o postman
                return rta;
            }            
        }

        //sino hay match
        return null;
    }

    //metodo para generar el JWT
    async generateJWT(user: User) {
        //en esta variable almaceno la info del user q quiero q viaje en el JWT
        const payload: PayloadToken = {
            role: user.role,
            sub: user.id, //se lo llama sub(por buenas prácticas)
        };

        return {
            access_token: this.jwtService.sign(payload), //encripto la info
            user,
        };
    }
}
