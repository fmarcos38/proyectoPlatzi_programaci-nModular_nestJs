import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from './customer.entity';
import { Product } from 'src/products/entities/product.entity';


@Schema()
export class Order extends Document {
  @Prop({ type: Date })
  date: Date;

  //relacion 1a1 embebida
  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;

  //relacion 1:N referenciada con productos
  @Prop({ type: [{type: Types.ObjectId, ref: Product.name}]}) //acá adentro declaro el tipo del atributo ES de tipo Mongo
  products: Types.Array<Product>; //declaro un array de Productos

}

export const OrderSchema = SchemaFactory.createForClass(Order);