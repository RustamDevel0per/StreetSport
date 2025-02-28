import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Wallet } from "../../wallet/models/wallet.model";

interface IUserCreationAttr {
  first_name:string
  last_name:string
  username: string;
  profile_photo:string
  phone: string;
  email: string;
  hashed_password: string;
  confirm_password:string
  is_owner:boolean

}

@Table({ tableName: "user" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(50),

  })

  first_name: string;

  @Column({
    type: DataType.STRING(50),

  })
  last_name: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(20),
    unique: true,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string | null;

  @HasMany(()=>Wallet)
  wallets: Wallet[]
}
