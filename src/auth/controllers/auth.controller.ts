import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    //ruta login
    //el AuthGuard va a realizar toda la logica
    @UseGuards(AuthGuard('local')) //local VIENE del arch --> local.strategy.ts
    @Post('login') //ruta para postman -->auth/login
    login(@Req() req: Request) {
        return req.user;
    }
}
