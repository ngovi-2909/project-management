import { BelongsTo, Column, CreatedAt, DataType, Table, UpdatedAt } from "sequelize-typescript";
import { Model } from 'sequelize-typescript';
import { ProjectType } from "../../project-type/entities/project-type.entity";

@Table({ tableName: 'project_tbl' })
export class Project extends Model<Project> {
  @Column({
    primaryKey: true,
    type: DataType.STRING(6),
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    unique: true,
  })
  name: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  status: boolean

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => ProjectType, 'project_type_id')
  projectType: ProjectType;

}
