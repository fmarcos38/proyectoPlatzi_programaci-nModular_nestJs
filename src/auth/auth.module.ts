import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; //tamb la agrego YO
import { ConfigType } from '@nestjs/config';

//me traigo las funcionalidades del modulo UserModule
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy'; //tamb la agrego YO
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import config  from '../../config';

@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.registerAsync({ //logica q pertenece al manejo de JWT
      //inyecto variables de entorno a un useFactory
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret, //estoy declarando la llave con la q se desencriptarán/abriran los tokens
          signOptions: {
            expiresIn: '10d', //expiran en 10 dias
          },
        };
      },
    }),
  ], //realizo la declaracion para q sea accesible desde otros modulos 
  providers: [AuthService, LocalStrategy, JwtStrategy], 
  controllers: [AuthController] //este fragmnto se generó automatikmnt Al crear el controlador por consola
})
export class AuthModule {}
