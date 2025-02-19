import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateRegionDto {
  @ApiPropertyOptional({
    example: "Samarkand",
    description: "Updated name of the region",
  })
  @IsString()
  @IsOptional()
  name?: string;
}
