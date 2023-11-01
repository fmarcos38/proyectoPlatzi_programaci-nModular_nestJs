import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty() //este decorador es para q se vea el arch dto en la documentacion
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto){}