import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  /* findAll() {
    return this.categoryModel;
  } */

  /* async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec;
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  } */


}
