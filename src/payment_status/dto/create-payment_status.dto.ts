import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePaymentStatusDto {
    @ApiProperty({
        example:"pending"
    })
    @IsString()
    name:string
}
