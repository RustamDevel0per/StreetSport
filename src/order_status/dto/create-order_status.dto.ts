import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderStatusDto {
  @ApiProperty()
  name: string;
}
