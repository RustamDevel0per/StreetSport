import { IsString, IsPhoneNumber, IsNotEmpty,IsEmail, MinLength, IsStrongPassword } from "class-validator"


export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  profile_photo: string;

  @IsPhoneNumber("UZ")
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  is_owner:boolean

}
