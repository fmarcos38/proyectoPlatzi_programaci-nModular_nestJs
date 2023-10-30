import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;
}

export class UpdateUserDto {
  readonly email?: string;
  readonly password?: string;
  readonly role?: string;
}