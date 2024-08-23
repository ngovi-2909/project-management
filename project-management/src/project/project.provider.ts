import {PROJECT_REPOSITORY} from "../core/constant";
import {Project} from "./entities/project.entity";

export const projectProviders = [{
  provide:   PROJECT_REPOSITORY,
  useValue: Project,
}];