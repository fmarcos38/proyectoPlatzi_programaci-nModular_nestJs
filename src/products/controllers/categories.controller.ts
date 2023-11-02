import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

  constructor(private categoryService: CategoriesService) {}

  //metodos
  @Get()
  getCategories() {
    return this.categoryService.findAll();
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
