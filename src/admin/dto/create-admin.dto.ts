import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
} from "class-validator";

export class CreateAdminDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsPhoneNumber('UZ')
    phone: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    confirm_password: string;
}