import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICategoryCreationAttr {
  name: string;
}

@Table({ tableName: "category", freezeTableName: true })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
}
