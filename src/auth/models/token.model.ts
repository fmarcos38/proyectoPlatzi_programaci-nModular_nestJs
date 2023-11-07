//archivo PARA tipar las variables de tipo token
//como la del arch --> auth.service --> metodo generateJWT --> variable payload

export interface PayloadToken {
    role: string;
    sub: string;
}