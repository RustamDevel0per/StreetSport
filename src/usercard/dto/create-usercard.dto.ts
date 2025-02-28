import { ApiProperty } from "@nestjs/swagger";

export class CreateUsercardDto {
    @ApiProperty()
    number: number;
    @ApiProperty()
    year: string;
    @ApiProperty()
    month: string;
    @ApiProperty()
    is_main: boolean;
    @ApiProperty()
    given_name: string;
    @ApiProperty()
    userId: number;
}
