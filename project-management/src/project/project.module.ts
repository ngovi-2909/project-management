import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from "./entities/project.entity";
import { projectProviders } from "./project.provider";

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService, ...projectProviders],
  exports: [ProjectService]
})
export class ProjectModule {}
