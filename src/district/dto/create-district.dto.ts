import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDistrictDto {
  @ApiProperty({ example: "Tashkent", description: "Name of the district" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, description: "ID of the related region" })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;
}
