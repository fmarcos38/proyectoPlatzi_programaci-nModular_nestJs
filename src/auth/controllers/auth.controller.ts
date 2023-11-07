import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {

    //inyecto el servicio AuthService PARA poder utilizar sus metodos
    constructor(private authService: AuthService) {}

    //ruta login
    //el AuthGuard va a realizar toda la logica
    @UseGuards(AuthGuard('local')) //local VIENE del arch --> local.strategy.ts
    @Post('login') //ruta para postman -->auth/login
    login(@Req() req: Request) {
        const user = req.user as User; //aqui le especifíco Q quiero q req.user se comporte como tipo de User entity(asi no me da error de tipeo)

        return this.authService.generateJWT(user);
    }
}
