import {HttpException, HttpStatus, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {Project} from './entities/project.entity';
import {Op} from 'sequelize';
import {PROJECT_REPOSITORY} from '../core/constant';

@Injectable()
export class ProjectService {
  constructor(@Inject(PROJECT_REPOSITORY) private readonly projectRepository: typeof Project) {}

  async createProject(createProjectDto: CreateProjectDto) {
    try{
      return await this.projectRepository.create(createProjectDto);
    }catch(error){
      throw new HttpException(error.errors[0].message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllProject() {
    return await this.projectRepository.findAll({
        order: [['code', 'ASC']],
      });
  }

  async findOne(code: string) {
    try {
      return await this.projectRepository.findOne({
        where: {code: code}
      });
    }catch(error){
      throw new NotFoundException(`Cannot found project with code ${code}`);
    }
  }

  async updateProject(code: string, updateProjectDto: UpdateProjectDto) {
    try{
      return await this.projectRepository.update(
        updateProjectDto, {
          where: {code},
          returning: true
        });
    }catch(error){
      throw new HttpException(error.errors[0].message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteProject(code: string) {
    try{
      return await this.projectRepository.destroy({
        where: {code},
      })
    }catch(error) {
      throw new NotFoundException(`Project with code ${code} not found`);
    }
  }

  async searchProject(name: string, type: number){
    const condition = {}
    if(name){
      condition['name'] = {
        [Op.iLike]: `%${name.toLowerCase()}%`
      };
    }
    if(type){
      condition['project_type_id'] = type;
    }
    return await this.projectRepository.findAll({
      attributes: ['code', 'name', 'status', 'project_type_id'],
      where: condition,
      order: [['code', 'ASC']],
    });
  }

}
