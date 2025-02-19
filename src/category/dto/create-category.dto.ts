import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Electronics",
    description: "The name of the category",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "Devices and gadgets",
    description: "Category description",
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1,
    description: "Parent category ID",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  parent_id?: number;
}
