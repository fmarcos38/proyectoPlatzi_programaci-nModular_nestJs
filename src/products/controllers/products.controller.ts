import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger'; //me sirve par agrupar en la documentacion POR modulos(osea Categoria, producto)
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dtos';
import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Products') //para agrupar en docs
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //metodo trae productos
  //y realiza paginacion
  @Get()
  @ApiOperation({summary: 'Lista los productos'}) //agrega info en la documentación
  getProducts(@Query() params: FilterProductsDto) {//@Query[es el identificador de q van a venir params por Query] - paramas[es un parametro NORMAL]- FilterProductsDto[es el tipado]
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    return this.productsService.findAll(params);
  }

  //metodo trae prod por ID
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return this.productsService.findOne(productId);
  }

  /* @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  } */
}
