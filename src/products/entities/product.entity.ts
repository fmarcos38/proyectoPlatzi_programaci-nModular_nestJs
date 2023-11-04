import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Brand } from "./brand.entitiy";
import { SubDoc, SubDocSchema } from "./sub-doc.entity";

@Schema()
export class Product extends Document{
  @Prop({required: true}) //requerido
  name: string;

  @Prop()
  description: string;

  @Prop({type: Number, index: true}) //utilizo el index(indexado para mejorar los tiempos de respuesta)
  price: number;

  @Prop({type: Number}) //ver en documentacion de mongoose --> https://mongoosejs.com/docs/schematypes.html (los tipos q se tienen q especificar)
  stock: number;

  @Prop()
  image: string;

  //declaracion de la relacion 1a1 con Category
  @Prop(
    raw({
      //atributos d la schema Category
      name: {type: String},
    })
  )
  categry: Record<string, any>

  //creo atributo para RELACION 1a1 REFERENCIADA
  @Prop({ type: Types.ObjectId, ref: Brand.name}) //aqui digo el tipado y la referencia
  brand: Brand | Types.ObjectId; //el tipado es Entity Brand o Types.ObjectId de mongoose

  //atributo para SUBDOC
  @Prop({ type: SubDocSchema })
  subDoc: SubDoc;

  @Prop({ type: [SubDocSchema] })
  subDocs: Types.Array<SubDoc>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

//indexacion compuesta (indexa de a dos atributos)
ProductSchema.index({price: 1, stock: -1}); //ver documentacion de mongo para indexadores