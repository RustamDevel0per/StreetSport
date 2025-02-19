import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  email: string;
  phone: string;
  hashed_password: string;
  hashed_refresh_token: string | null;
  activation_link:string | null
}

@Table({tableName:"admin"})
export class Admin extends Model<Admin, IAdminCreationAttr> {
    
    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    })
    id:number
    @Column({
        type:DataType.STRING,
        unique:true
    })
    email: string;
    @Column({
        type:DataType.STRING,
    })
    phone: string;
    @Column({
        type:DataType.STRING,
    })
    hashed_password: string;
    @Column({
        type:DataType.STRING,
    })
    hashed_refresh_token: string;
    
    @Column({
        type:DataType.STRING,
    })
    activation_link:string;
    
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_active:boolean
    
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_creator:boolean
}
