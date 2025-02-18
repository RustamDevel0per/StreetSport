import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IPaymentStatusCreationAttr {
  name: string;
}

@Table({ tableName: "payment_status" })
export class PaymentStatus extends Model<
  PaymentStatus,
  IPaymentStatusCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
