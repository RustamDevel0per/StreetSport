import { ApiProperty } from "@nestjs/swagger";

export class FindUserDto {
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  phone: string;
  
  @ApiProperty()
  email: string;
}
