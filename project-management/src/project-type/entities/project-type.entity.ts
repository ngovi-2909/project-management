import {
  AfterCreate, BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Project } from '../../project/entities/project.entity';

@Table({tableName: 'project_type_tbl'})
export class ProjectType extends Model<ProjectType>{
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasMany(() => Project, 'project_type_id')
  projectID: Project[];

  @BeforeCreate
  static async createAdditionalRecords(instance: ProjectType, options: any) {
    // Create the first additional record
    await ProjectType.create({
      name: 'Web',
    });

    // Create the second additional record
    await ProjectType.create({
      name: 'App',
    });

    // Return the instance to be created
    return instance;
  }

}
