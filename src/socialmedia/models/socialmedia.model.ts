import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISocialmediaCreationAttr {
  social_media: string;
  iconic_url: string;
}

@Table({ tableName: "socialmedia" })
export class Socialmedia extends Model<Socialmedia, ISocialmediaCreationAttr> {
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
  declare social_media: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare iconic_url: string;
}
