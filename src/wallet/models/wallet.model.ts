import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/model/user.model";


interface IWalletCreationAttr {
    userId: number;
    amount: number;
}

@Table({tableName:"wallet"})
export class Wallet extends Model<Wallet, IWalletCreationAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ForeignKey(() => User)
    @Column({
        type:DataType.INTEGER,
    })
    userId: number;
    
    @BelongsTo(() => User)
    user: User;

    @Column({
        type:DataType.INTEGER,
    })
    amount: number;
}
