import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document{
  @Prop({required: true}) //requerido
  name: string;

  @Prop()
  description: string;

  @Prop({type: Number})
  price: number;

  @Prop({type: Number}) //ver en documentacion de mongoose --> https://mongoosejs.com/docs/schematypes.html (los tipos q se tienen q especificar)
  stock: number;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);