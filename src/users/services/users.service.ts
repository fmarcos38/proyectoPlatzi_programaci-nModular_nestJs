import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from '../../products/services/products.service';

/* 
  NOTA: este ARCH es el q genera LAS RUTAS
  Por ejm AllUsers-> http://localhost:3000/users/
*/

@Injectable()
export class UsersService {

  constructor(
    private productsService: ProductsService,
    @Inject('MONGO') private databaseMongo: Db,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  getTasks() {
    const tasksCollection = this.databaseMongo.collection('tasks');
    return tasksCollection.find().toArray();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async getOrdersByUser(userId: string) {
    const user = await this.findOne(userId);
    return {
      date: new Date(),
      user,
      // products: this.productsService.findAll(),
      products: [],
    };
  }

  async create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    //hashing de pass
    const hashPass = await bcrypt.hash(newModel.password, 10);//hasheo la pass
    newModel.password = hashPass; //se la asigno al objeto q enviará la data a la DB
    const model = await newModel.save();
    //voy a quitar el pass del objeto model(q es el q tiene toda la data)
    //model ahora se vuelve rta(q es una variable declarada con abreviatura de JS)tiene la data menos el pass
    //esto es para no retornar el pass en la respuesta
    const { password, ...rta } = model.toJSON(); 
    return rta;
  }

  //busco por email
  findByEmail(email: string) {
    return this.userModel.findOne({email}).exec();
  }

  update(id: string, changes: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
