import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IRecipientSocialCreationAttr {
  socialmediaId: number;
  recipientId: number;
  social_url: string;
}

@Table({ tableName: "recipient_social" })
export class Recipientsocial extends Model<
  Recipientsocial,
  IRecipientSocialCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare social_url: string;
}
