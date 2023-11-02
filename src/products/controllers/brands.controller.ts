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
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Brands')
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
  findOne(@Param ('id', MongoIdPipe) id: string) {
    return this.brandService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateBrandDto) {
    return this.brandService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.brandService.delete(id);
  }
}
