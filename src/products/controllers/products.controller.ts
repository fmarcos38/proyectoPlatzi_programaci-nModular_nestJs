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
  UseGuards,
  // ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger'; //me sirve par agrupar en la documentacion POR modulos(osea Categoria, producto)
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dtos';
import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { AuthGuard } from '@nestjs/passport'; //para proteger endpoints este guard YA viene
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';

//puedo utilizar este guard q ya viene con nest
//@UseGuards(AuthGuard('jwt')) //con jwt --> le digo la estrategia q utilizará(la desarrollamos en otro arch)
//o puedo usar uno q desarrolle yo mismo q extiende DEL q trae nest
@UseGuards(JwtAuthGuard, RolesGuard) //SE pueden agregar mas de 1, solo q SI importa el orden
@ApiTags('Products') //para agrupar en docs
@Controller('products')
export class ProductsController {

  //constructor
  constructor(private productsService: ProductsService) {}

  
  //metodo trae productos
  //y realiza paginacion
  @Public() //aplico el decorador crea por nosotros PARA quitar la proteccion del endpoint
  @Get()
  @ApiOperation({summary: 'Lista los productos'}) //agrega info en la documentación
  getProducts(@Query() params: FilterProductsDto) {//@Query[es el identificador de q van a venir params por Query] - paramas[es un parametro NORMAL]- FilterProductsDto[es el tipado]
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    return this.productsService.findAll(params);
  }

  //metodo trae prod por ID
  @Public()
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return this.productsService.findOne(productId);
  }

  @Roles(Role.ADMIN) //especifico q solo un admiin puede accceder a este endpoint
  @Post()
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
  }
}
