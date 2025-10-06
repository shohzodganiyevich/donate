import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "../../category/models/category.model";
import { Order } from "../../order/models/order.model";
import { Recipient } from "../../recipient/models/recipient.model";

interface IShopCreationAttr {
  name: string;
  count: number;
  price: number;
  title: string;
  recipient_id: number;
  category_id: number;
  description: string;
}

@Table({ tableName: "shop", freezeTableName: true })
export class Shop extends Model<Shop, IShopCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare count: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  declare price: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ForeignKey(() => Recipient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare recipient_id: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare category_id: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @BelongsTo(() => Recipient)
  declare recipient: Recipient;

  @BelongsTo(() => Category)
  declare category: Category;

  @HasMany(() => Order)
  declare orders: Order[];
}
