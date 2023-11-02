import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
import { Category } from '../entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class CategoriesService {
  
  //constructor para inyectar schema
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}
  //metódos
  //trae todas las categorias
  findAll() {
    return this.categoryModel.find().exec();
  }

  //trae una categoría
  findOne(id: string) {
    const cat = this.categoryModel.findById(id);
    if (!cat) {
      throw new NotFoundException('No existe dicha categoria');
    }
    return cat;
  }

  //create
  //acá utilizo el DTO
  create(data: CreateCategoryDto) {
    const newCat = new Category(data);
    return newCat.save();
  }

  //update
  update(id: string, data: UpdateCategoryDto) {
    const cat = this.categoryModel.findByIdAndUpdate(id, {$set: data }, { new: true }).exec();
    if(!cat) {
      throw new NotFoundException("No existe el brand");
    }
    return cat;
  }

  //delete
  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  } 
}
