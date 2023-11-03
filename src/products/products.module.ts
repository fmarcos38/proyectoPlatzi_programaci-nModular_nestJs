import { Module } from '@nestjs/common';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { BrandsService } from './services/brands.service';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Category, CategorySchema } from './entities/category.entity';
import { Brand, BrandSchema } from './entities/brand.entitiy';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema
            },
            {
                name: Category.name,
                schema: CategorySchema
            },
            {
                name: Brand.name,
                schema: BrandSchema
            }

        ])
    ], //aquí declaro los SCHEMAS q va a utilizar este modulo(osea el modulo Products -> maneja el schema/entity Product)
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, CategoriesService, BrandsService],
    exports: [ProductsService], //con esto hago q ese service sea exportable PARA otro modulo q lo requiera(como users)
})
export class ProductsModule {}
