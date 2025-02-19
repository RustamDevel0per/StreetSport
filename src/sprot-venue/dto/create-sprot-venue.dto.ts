import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from "class-validator";

export class CreateSportVenueDto {
  @ApiProperty({ example: 2, description: "Category ID" })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ example: 3, description: "Owner ID (User)" })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;

  @ApiProperty({ example: 4, description: "Manager ID (User)" })
  @IsNumber()
  @IsNotEmpty()
  managerId: number;

  @ApiProperty({ example: "Champions Arena", description: "Venue name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "123 Main St, Tashkent",
    description: "Venue address",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 1, description: "Region ID" })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty({ example: 5, description: "District ID" })
  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  @ApiProperty({
    example: "41.2995, 69.2401",
    description: "Location (latitude, longitude)",
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: "08:00", description: "Opening time (HH:mm)" })
  @IsString()
  @IsNotEmpty()
  work_start_time: string;

  @ApiProperty({ example: "22:00", description: "Closing time (HH:mm)" })
  @IsString()
  @IsNotEmpty()
  work_end_time: string;

  @ApiProperty({ example: true, description: "Is the venue outdoor?" })
  @IsBoolean()
  @IsNotEmpty()
  is_outdoor: boolean;

  @ApiProperty({
    example: "A modern football field",
    description: "Description (optional)",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Contact phone number",
  })
  @IsString()
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone_number: string;
}
