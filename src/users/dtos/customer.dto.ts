import { IsArray, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
//agregado para q se lean los dto en la documentacion
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({description: 'user name'}) //le agrego descripción a cada atributo, para q se vea en la doc
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({description: 'user lastname'})
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({description: 'user telephone'})
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @IsArray()
  @IsNotEmpty()
  readonly skills: any[]; //atributo Array para relacion
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}