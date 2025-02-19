import { Model, Table, Column, DataType } from "sequelize-typescript";

interface IRegionCreationAttr {
  name: string;
}

@Table({ tableName: "regions", timestamps: true })
export class Region extends Model<Region, IRegionCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
}
