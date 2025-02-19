import { ApiProperty } from "@nestjs/swagger";

export class CreateMediaDto {
  @ApiProperty({
    example: "https://example.com/media.jpg",
    description: "Media URL",
  })
  url: string;

  @ApiProperty({
    example: 2,
    description: "Foreign key referencing SportVenue",
  })
  sportVenueId: number;
}
