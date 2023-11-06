import { IsMongoId, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[]; //array de string PARA las relaciones q neseciten u  array
}

//para la actualizacion QUIERO q me omita osea q non reciba al atributo products
export class UpdateOrderDto extends PartialType(OmitType(CreateOrderDto, ['products'])) {}

//crea una nueva class PARA agregar productos a la orden de compra
export class AddProductsToOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}