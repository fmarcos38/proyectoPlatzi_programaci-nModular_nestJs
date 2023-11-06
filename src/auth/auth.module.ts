import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';

//me traigo las funcionalidades del modulo UserModule
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport'; //tamb la agrego YO
import { LocalStrategy } from './strategies/local.strategy'; //tamb la agrego YO
import { AuthController } from './controllers/auth.controller';


@Module({
  imports: [UsersModule, PassportModule], //realizo la declaracion para q sea accesible
  providers: [AuthService, LocalStrategy], 
  controllers: [AuthController] //este fragmnto se generó automatikmnt Al crear el controlador por consola
})
export class AuthModule {}
