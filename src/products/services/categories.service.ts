import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  //como solo estamos trabajando en mnemoria, creo contador para ID, y array de categorias
  private countId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Frutas',
    },
  ];

  //metódos
  //trae todas las categorias
  findAll() {
    return this.categories;
  }

  //trae una categoría
  findOne(id: number) {
    const cat = this.categories.find(c => c.id === id);
    if (!cat) {
       throw new NotFoundException('No existe dicha categoria');
    }
    return cat;
  }

  //create
  //acá utilizo el DTO
  create(data: CreateCategoryDto) {
    //agrego 1 al id
    this.countId = this.countId + 1;
    //creo un obj para añadir al array
    const newCat = {
      id: this.countId,
      ...data,
    }
    this.categories.push(newCat);
    return newCat;
  }

  //update
  update(id: number, data: UpdateCategoryDto) {
    //busco el elemnt
    const category = this.findOne(id);
    //busco el indice del elemnt en el array
    const inidexCat = this.categories.findIndex((c) => c.id === id);
    //lo reemplazo
    this.categories[inidexCat] = {
      ...category,
      ...data,
    };
  }

  //delete
  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
