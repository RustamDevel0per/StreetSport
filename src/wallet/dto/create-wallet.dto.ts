import { ApiProperty } from "@nestjs/swagger";

export class CreateWalletDto {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    amount: number;
}
