import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entitiy';

@Injectable()
export class BrandsService {
  private countId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];

  //metodos
  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((b) => b.id === id);
    if (!brand) {
      throw new NotFoundException('`Brand #${id} not found`');
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    this.countId = this.countId + 1;
    const newBrand = {
      id: this.countId,
      ...data,
    }
  }

  update(id: number, data: UpdateBrandDto) {
    const brand = this.findOne(id);
    const indexBrand = this.brands.findIndex((b) => b.id === id);
    this.brands[indexBrand] = {
      ...brand,
      ...data,
    };
  }

  delete(id: number) {
    const indexBrand = this.brands.findIndex((b) => b.id === id);
    if (indexBrand === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(indexBrand, 1);
    return true;
  }
}
