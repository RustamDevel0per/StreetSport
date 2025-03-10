import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto {
  @ApiProperty({ example: "Tashkent", description: "Name of the region" })
  @IsString()
  @IsNotEmpty()
  name: string;
}
