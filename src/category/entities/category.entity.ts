import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

interface ICategoryCreationAttr {
  name: string;
  description: string;
  parent_id: number;
}

@Table({ tableName: "category" })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the category",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "Electronics", description: "Category name" })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: "Devices and gadgets",
    description: "Category description",
  })
  @Column({ type: DataType.STRING, allowNull: false }) // Ensure `allowNull: false`
  description: string;

  @ApiProperty({ example: 1, description: "Parent category ID (nullable)" })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: true })
  parent_id?: number;

  @BelongsTo(() => Category)
  parentCategory: Category;
}
