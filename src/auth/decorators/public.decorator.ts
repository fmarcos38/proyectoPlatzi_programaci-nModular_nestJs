import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic';

//este decorador me sirve PARA especificar CUANDO quiero q un endpoint SEA PUBLICO
//y no requiera token
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); //creo decorador en true