import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [ProductsModule], //me traigo el ProductsModule(para utilizar sus servicios)
    controllers: [CustomersController, UsersController],
    providers: [CustomersService, UsersService],
})
export class UsersModule {}
