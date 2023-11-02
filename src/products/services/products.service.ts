import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dtos';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  
  //constructor
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  //trae todos los productos CON paginado
  findAll(params?: FilterProductsDto) {
    if(params) {
      const { limit, offset} = params;
      return this.productModel.find().skip(offset).limit(limit).exec();
    }
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProd = new this.productModel(data);

    return newProd.save();
  }

  update(id: string, data: UpdateProductDto) {
    const buscoProd = this.productModel.findByIdAndUpdate(id, {$set: data }, { new: true }).exec();
    if(!buscoProd) {
      throw new NotFoundException("No existe el prod");
    }
    return buscoProd;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
