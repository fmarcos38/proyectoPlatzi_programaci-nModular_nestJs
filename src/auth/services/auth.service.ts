import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    //para poder inyectarlo desd el constructor 1ro lo importo en el arch --> auth.module.ts
    constructor(private userService: UsersService) {}

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
}
