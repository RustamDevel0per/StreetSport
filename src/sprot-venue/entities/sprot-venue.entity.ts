import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../../category/entities/category.entity";
import { User } from "../../users/model/user.model";
import { Region } from "../../region/entities/region.entity";
import { District } from "../../district/entities/district.entity";

interface SportVenueCreationAttrs {
  categoryId: number;
  ownerId: number;
  managerId: number;
  name: string;
  address: string;
  regionId: number;
  districtId: number;
  location: string;
  work_start_time: string;
  work_end_time: string;
  is_outdoor: boolean;
  description: string| undefined;
  phone_number: string;
}

@Table({ tableName: "sport_venues" })
export class SportVenue extends Model<SportVenue, SportVenueCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique identifier for the venue" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 2, description: "Category ID" })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ example: 3, description: "Owner ID (User)" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ownerId: number;

  @BelongsTo(() => User, { foreignKey: "ownerId", as: "owner" })
  owner: User;

  @ApiProperty({ example: 4, description: "Manager ID (User)" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  managerId: number;

  @BelongsTo(() => User, { foreignKey: "managerId", as: "manager" })
  manager: User;

  @ApiProperty({ example: "Champions Arena", description: "Venue name" })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: "123 Main St, Tashkent",
    description: "Venue address",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @ApiProperty({ example: 1, description: "Region ID" })
  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: false })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @ApiProperty({ example: 5, description: "District ID" })
  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER, allowNull: false })
  districtId: number;

  @BelongsTo(() => District)
  district: District;

  @ApiProperty({
    example: "41.2995, 69.2401",
    description: "Location (lat, long)",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @ApiProperty({ example: "08:00", description: "Opening time (HH:mm)" })
  @Column({ type: DataType.STRING, allowNull: false })
  work_start_time: string;

  @ApiProperty({ example: "22:00", description: "Closing time (HH:mm)" })
  @Column({ type: DataType.STRING, allowNull: false })
  work_end_time: string;

  @ApiProperty({ example: true, description: "Is the venue outdoor?" })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_outdoor: boolean;

  @ApiProperty({
    example: "A modern football field",
    description: "Description",
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Contact phone number",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  phone_number: string;
}
