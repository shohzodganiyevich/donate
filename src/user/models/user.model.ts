import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "../../order/models/order.model";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  card_number: string;
  token?: string;
  is_active?: boolean;
}

@Table({ tableName: "user", freezeTableName: true })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare card_number: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  declare token: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @HasMany(() => Order)
  declare orders: Order[];
}
