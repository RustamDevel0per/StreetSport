import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/model/user.model";

interface IOwnerLicenseCreateAttr {
  ownerId: number;
  license:string
  tin:number

}

@Table({ tableName: "owner_license", timestamps: true })
export class OwnerLicense extends Model<OwnerLicense, IOwnerLicenseCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.BIGINT,
  })
  tin: number;

  @Column({
    type: DataType.STRING,
  })
  license: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;
}