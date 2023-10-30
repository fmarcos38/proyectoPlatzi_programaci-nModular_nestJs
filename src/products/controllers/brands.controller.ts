import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entitiy';
import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {
  //constructor con atributo(es el service)
  constructor(private brandService: BrandsService) {}

  //metodos
  @Get()
  finAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(id: number) {
    return this.brandService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.delete(+id);
  }
}
