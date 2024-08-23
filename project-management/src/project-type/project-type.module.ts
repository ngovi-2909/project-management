import { Module } from '@nestjs/common';
import { ProjectTypeService } from './project-type.service';
import { ProjectTypeController } from './project-type.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { ProjectType } from "./entities/project-type.entity";
import { projectTypeProviders } from "./project.type.provider";

@Module({
  imports: [SequelizeModule.forFeature([ProjectType])],
  controllers: [ProjectTypeController],
  providers: [ProjectTypeService, ...projectTypeProviders],
})
export class ProjectTypeModule {}
