import {PROJECT_TYPE_REPOSITORY} from "../core/constant";
import { ProjectType } from "./entities/project-type.entity";

export const projectTypeProviders = [{
  provide:   PROJECT_TYPE_REPOSITORY,
  useValue: ProjectType,
}];