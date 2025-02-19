import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IOrderStatusCreationAttr {
  name: string;
}
@Table({ tableName: "order_status" })
export class OrderStatus extends Model<OrderStatus, IOrderStatusCreationAttr>{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
