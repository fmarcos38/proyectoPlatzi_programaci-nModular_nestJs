//esta clase lo q hace es corroborar si el token q me llega es valido Si es asi desencriptarlo

import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigType } from "@nestjs/config";

import { ExtractJwt, Strategy } from "passport-jwt";
import config from '../../../config';
import { PayloadToken } from "../models/token.model";


@Injectable() //con este decorador LE digo q esta clase es un provider/o servicio q puede ser consumido desde otro lado
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { //'jwt' --> es el mismo nombre q irá en el arch --> products.controller.ts DENTRO del guardian q utilice

    constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//le digo desde donde tomo el jwt
            ignoreExpiration: false,
            secretOrKey: configService.jwtSecret, 
        })
    }

    //metodo al cual me llega por param el token con la info Q genere en la interfaz --> token.model.ts
    validate(payload: PayloadToken) {
        return payload; 
    }
}