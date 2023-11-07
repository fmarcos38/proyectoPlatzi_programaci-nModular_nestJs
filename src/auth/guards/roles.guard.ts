import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
//utilizo reflector para inyectar la metadata(osea los roles YA declarados) a traves del constructor
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(private reflector: Reflector) {}


  canActivate( context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> {
    //aqui me llega un ARRAY, pero solo con el/los valores q el endpoint permite a traves de la metadata del decorador utilizado
    //en este caso SOLO ADMIN
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler()); //con <Role[]> -> le doy el tipado(es un array de role)
    if(!roles){ //si no vino array de roles(esto quiere decir q el endpoint NO tiene el decorador PARA roles)
      return true //lo dejo pasar
    }
    //aca en este punto debo saber q user está autentificado y SI hacen match con dicho rol
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken; //obt la info del user a traves de JWT --> por eso uso el --> as PayloadToken <--
    //aca es donde pregunto si en el array q me vino está el rol q obtengo de user
    const buscoRole = roles.some(role => role === user.role);
    if(!buscoRole) {
      throw new UnauthorizedException('No posees rol de admin');
    }
    return buscoRole;
  }
}
