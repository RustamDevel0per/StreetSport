import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString, IsEmail, IsOptional } from "class-validator";


export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber("UZ")
  phone?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;
}
