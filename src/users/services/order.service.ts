import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../entities/order.entities';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel.find().populate('customer').populate('products').exec(); //con pupolate->le digo q me muestro dicho documento de mongo(NO solo wl id)

    //posible solucion si no funciona la de arriba, esta contiene Skils
    //return this.orderModel.find().populate('productIds).populate({ path: 'customer', populate: { path: 'skills', },}).exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id);
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  //elim prod del array Orden de compra
  async removeProduct(id: string, productId: string) {
    //obt la orden de compra
    const orden = await this.orderModel.findById(id);
    orden.products.pull(productId);//pull metodo para elim un elemnt de un array para mongo
    return orden.save();
  }

  //agrego productos
  //el 2do param es un array de string(dond vienen los id de los prod)
  async addProducts(idOrder: string, productsIds: string[]){
    const order = await this.orderModel.findByIdAndUpdate(
      idOrder,
      { $addToSet: { productos: productsIds }}
    )

    if(!order){
      throw new NotFoundException(`order ${idOrder} not found`);
    }

    return await order.save();
  }
}