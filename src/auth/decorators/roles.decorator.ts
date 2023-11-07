import { SetMetadata } from "@nestjs/common";
import { Role } from "../models/roles.model";

//creo llave para los roles
export const ROLES_KEY = 'roles';

//aqui vendra como param u array de roles
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, true); 

//a este decorator lo puedo llamar desde cualquier controlador PAra utilizarlo en los endpoints