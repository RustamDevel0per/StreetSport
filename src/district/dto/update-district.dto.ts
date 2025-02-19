import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDistrictDto } from "./create-district.dto";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {
  @ApiProperty({
    example: "Tashkent City",
    description: "Updated name of the district",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 2,
    description: "Updated ID of the related region",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  regionId?: number;
}
