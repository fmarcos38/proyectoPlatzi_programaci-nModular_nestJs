//este archivo es como un servico
//esta clase lo q hace es decirnos si un user tiene o no el pass correcto --> ver q servicio consume

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";


@Injectable() //con este decorador LE digo q esta clase es un provider/o servicio q puede ser consumido desde otro lado
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email', //le cambio el nombre a los atributos q vienen del front o de postman
        }); //con esto especifico q estoy llamando al constructor DE LA clase q estoy HEREDANDO
    }

    //metodos
    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);
        if(!user) {
            throw new UnauthorizedException("Email o Pass incorrecto");
        }
        return user;
    }
}