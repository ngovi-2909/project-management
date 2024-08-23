import { Inject, Injectable } from "@nestjs/common";
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';
import { ProjectService } from "../project/project.service";
import { ProjectType } from "./entities/project-type.entity";
import { where } from "sequelize";
import { PROJECT_TYPE_REPOSITORY } from "../core/constant";

@Injectable()
export class ProjectTypeService {
  constructor(@Inject(PROJECT_TYPE_REPOSITORY) private readonly projectTypeRepo: typeof ProjectType) {}


  // insert project type is web, app on first run
  async onApplicationBootstrap() {
    await this.ensureInitialProjectTypes();
  }

  private async ensureInitialProjectTypes() {
    const existingProjectTypes = await this.projectTypeRepo.count();
    if (existingProjectTypes === 0) {
      const initialProjectTypes = [
        {
          name: 'Web',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'App',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      await this.projectTypeRepo.bulkCreate(initialProjectTypes);
      console.log('Initial project types created');
    }
  }

  async create(createProjectTypeDto: CreateProjectTypeDto) {
    return await this.projectTypeRepo.create(createProjectTypeDto);
  }

  async findAll() {
    return await this.projectTypeRepo.findAll();
  }

  async findOne(id: number) {
    return await this.projectTypeRepo.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateProjectTypeDto: UpdateProjectTypeDto) {
    return await this.projectTypeRepo.update(updateProjectTypeDto, { where: { id: id }, returning: true });
  }

  async remove(id: number) {
    let oldType = await this.findOne(id);
    await this.projectTypeRepo.destroy({ where: { id } });
    return oldType;
  }
}
