import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Recipient } from "../../recipient/models/recipient.model";

interface IDonateCreationAttr {
  recipient_id: number;
  user_id: number;
  notification: string;
  is_anonim_pay: boolean;
}

@Table({ tableName: "donate", freezeTableName: true })
export class Donate extends Model<Donate, IDonateCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Recipient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare recipient_id: number;

  @BelongsTo(() => Recipient)
  declare recipient: Recipient;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare notification: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_anonim_pay: boolean;
}
