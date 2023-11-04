import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dtos';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  
  //constructor
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  //trae todos los productos CON paginado
  async findAll(params?: FilterProductsDto) {
    if(params) {
      const filters: FilterQuery<Product> = {}; //creo un obj vacio TIPADO con FilterQuery de Productos para los filtros, y se lo paso por paran a la funcion FIND de mongo
      const { limit, offset} = params;
      const { minPrice, maxPrice } = params;

      //al declarar un onj vacio, mongo me pemite pasarlo por param a la funcion find
      //entonces mediante if puedo desarrollar todos los filtros necesarios VER documentacion de mongo/o curso de mongo
      if(minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice } //gte -> >= ||| lte <= (codigo mongo)
      }

      return await this.productModel.find(filters).populate('brand').skip(offset).limit(limit).exec();
    }
    return this.productModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  /* create(data: CreateProductDto) {
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
  } */
}
