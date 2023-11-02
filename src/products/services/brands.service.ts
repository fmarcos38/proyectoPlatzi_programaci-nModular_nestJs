import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../entities/brand.entitiy';

@Injectable()
export class BrandsService {
  
  //creo el constructor -> para poder inyectar le schema correspondiente
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>
  ) {}
  
  //metodos
  findAll() {
    return this.brandModel.find().exec();
  }

  findOne(id: string) {
    const brand = this.brandModel.findById(id);
    if (!brand) {
      throw new NotFoundException('`Brand #${id} not found`');
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = new Brand(data)
    return newBrand.save();
  }

  update(id: string, data: UpdateBrandDto) {
    const brand = this.brandModel.findByIdAndUpdate(id, {$set: data }, { new: true }).exec();
    if(!brand) {
      throw new NotFoundException("No existe el brand");
    }
    return brand;
  }

  delete(id: string) {
      return this.brandModel.findByIdAndDelete(id);
  } 
}
