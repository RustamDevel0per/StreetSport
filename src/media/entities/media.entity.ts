import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { SportVenue } from "../../sprot-venue/entities/sprot-venue.entity";

interface IMediaCreationAttr {
  sportVenueId: number;
  url: string;
}

@Table({ tableName: "media", timestamps: true })
export class Media extends Model<Media, IMediaCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique identifier for the media" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "https://example.com/media.jpg",
    description: "Media URL",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @ApiProperty({
    example: 2,
    description: "Foreign key referencing SportVenue",
  })
  @ForeignKey(() => SportVenue)
  @Column({ type: DataType.INTEGER, allowNull: false })
  sportVenueId: number;

  @BelongsTo(() => SportVenue)
  sportVenue: SportVenue;
}
