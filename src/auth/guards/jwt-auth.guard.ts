import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { //este guardian EXTIENDE/hereda del q ya viene en nest
  
  //inyecto dependencia a traves del constructor
  constructor(private reflector: Reflector) {
    super(); //no olvidar TODAS las clases q heredan llevan el super, para instanciar al padre
  }

  //metodos
  canActivate(context: ExecutionContext) {
    //con esta logica voy a obtener la metadata
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    //si la obtuve
    if(isPublic){ //esto quiere decir q si es un endpoint publico SI te doy permiso(no hace falta token)
      return true;
    }
    return super.canActivate(context);
  }
}
