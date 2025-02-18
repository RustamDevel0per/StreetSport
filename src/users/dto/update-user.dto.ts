import { IsPhoneNumber, IsString, IsEmail, IsOptional } from "class-validator";


export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsPhoneNumber("UZ")
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
