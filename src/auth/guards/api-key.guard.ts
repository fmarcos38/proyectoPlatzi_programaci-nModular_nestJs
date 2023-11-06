import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express'; //esto lo uso para el tipado del request
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import config  from '../../../config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  //inyecto a traves del constructor a --> Reflector
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>  
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //me traigo la metadata desde el controlador
    //con esto no realiza la validacion del token(es para los endpoint q NO quiero proteger)
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler()); //IS_PUBLIC_KEY -> esta constante la desarrollamos nosotros en el archivo del decorador personalizado
    if(isPublic) {
      return true
    }

    //SINO el endpoint NO es publico realiza la sgt logica para corroborar si el header es correcto
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth'); //guardo en una variab lo q viene por el header
    const isAuth = authHeader === this.configService.apiKey; //.apikey VIENE del Arch config.ts
    if(!isAuth) {
      throw new UnauthorizedException('error de autenticación')
    }
    return isAuth;

    //return true; //si está en tru EL guardian va a dejar el el request entre y haga un proceso,
    //si está en false NO permite el ingreso de ese request.
  }
}
