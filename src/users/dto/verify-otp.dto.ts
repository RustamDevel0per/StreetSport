import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class VerifyOtpDto {
  @ApiProperty()
  @IsPhoneNumber("UZ")
  phone: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  verification_key: string;
}
