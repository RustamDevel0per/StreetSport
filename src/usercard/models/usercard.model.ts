import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/model/user.model";

interface IUserCardCreationAttr {
    number: number;
    year: string;
    month: string;
    is_main: boolean;
    given_name: string;
    userId: number;
}

@Table({ tableName: "user_card" })
export class Usercard extends Model<Usercard, IUserCardCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
    })
    number: number;

    @Column({
        type: DataType.STRING,
    })
    year: string;

    @Column({
        type: DataType.STRING,
    })
    month: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    is_main: boolean;

    @Column({
        type: DataType.STRING,
    })
    given_name: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
