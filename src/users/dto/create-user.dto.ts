import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsPhoneNumber, IsNotEmpty,IsEmail, MinLength, IsStrongPassword } from "class-validator"


export class CreateUserDto {
  @ApiProperty()
  @IsString()
  first_name: string;
  
  @ApiProperty()
  @IsString()
  last_name: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
  
  @ApiProperty()
  profile_photo: string;
  
  @ApiProperty()
  @IsPhoneNumber("UZ")
  phone: string;
  
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
  
  is_owner:boolean
  
}
