import { ApiProperty } from "@nestjs/swagger";

export class CreateOwnerLicenseDto {
  @ApiProperty()
  ownerId: number;
  @ApiProperty()
  license: string;
  @ApiProperty()
  tin: number;
}
