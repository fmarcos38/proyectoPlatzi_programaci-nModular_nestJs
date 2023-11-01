import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { ProductsService } from 'src/products/services/products.service';
import { ConfigService } from '@nestjs/config'; //para el arch .env

/* 
  NOTA: este ARCH es el q genera LAS RUTAS
  Por ejm AllUsers-> http://localhost:3000/users/
*/

@Injectable()
export class UsersService {

  constructor(
    private productService: ProductsService,
    private configService: ConfigService //asi me traigo el archivo .en
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  findAll() {
    //me traigo del arch .env una de sus variables
    const val = this.configService.get('VALOR');
    console.log("valor: ", val);//ejmplo para ver la variable de entorno
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrderByUser(id: number) {
    const user = this.findOne(id);
    if(!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return {
      date: new Date(),
      user,
      products: this.productService.findAll(),
    }
  }
}
