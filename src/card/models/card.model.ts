import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICardCreationAttr {
  card_type: string;
  card_number: number;
  expiry_date: Date;
  recipientId: number;
}

@Table({ tableName: "card" })
export class Card extends Model<Card, ICardCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.ENUM("UZCARD", "HUMO", "VISA"),
    allowNull: false,
  })
  declare card_type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare card_number: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare expiry_date: Date;
}
