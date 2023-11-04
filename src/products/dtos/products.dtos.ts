import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './categories.dtos';
import { CreateSubDocDto } from './sub-doc.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @ValidateNested() //decorador PARA la relacion
  @ApiProperty()
  @IsNotEmpty()
  readonly category: CreateCategoryDto;

  //atributo para rel 1:1 SUBDOC
  @ApiProperty() //es para swagger
  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto;

  @IsMongoId()
  @IsNotEmpty()
  readonly brand: string //paso el id de la Brand

  //para la relacion 1:N de SUBDOC
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[]; 
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

//clase para paginacion
export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice) //aquí con este DECORADOR le digo Q si viene minPrice TAMB tiene q venir maxPrice
  @IsPositive()
  maxPrice: number
  
}