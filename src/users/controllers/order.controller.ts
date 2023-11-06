import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  
  import { OrdersService } from '../services/order.service';
  import { AddProductsToOrderDto, CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
  
  /*
  NOTA: en esta clase GENERO los ENDPOITS
*/
  @ApiTags('orders')
  @Controller('orders')
  export class OrdersController {
    constructor(private ordersService: OrdersService) {}
  
    @Get()
    findAll() {
      return this.ordersService.findAll();
    }
  
    @Get(':id')
    get(@Param('id') id: string) {
      return this.ordersService.findOne(id);
    }
  
    @Post()
    create(@Body() payload: CreateOrderDto) {
      return this.ordersService.create(payload);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
      return this.ordersService.update(id, payload);
    }
  
    //agrego productos(utilizo un put porq en realidad es actualizar la orden de compra)
    @Put(':id/products')
    updateProducts(@Param('id') id: string, @Body() payload: AddProductsToOrderDto) {
      return this.ordersService.addProducts(id, payload.productsIds);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.ordersService.remove(id);
    }

    //endpoint para elim prod de la orden de compra
    @Delete(':id/product/:productId')
    removeProduct(@Param('id') id: string, @Param('productId') productId: string) {
      return this.ordersService.removeProduct(id, productId);
    }


  }