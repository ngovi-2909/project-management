import { Body, Controller, Delete, Get, NotAcceptableException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ApiResponse } from "@nestjs/swagger";
import { SearchProjectDto } from './dto/search-project.dto';
import { CreateProjectTypeDto } from '../project-type/dto/create-project-type.dto';
import { of } from 'rxjs';

@Controller('api/v1/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiResponse({ status: 200, type: CreateProjectDto })
  create(@Body() createProjectDto: CreateProjectDto) {
    const project = this.projectService.createProject(createProjectDto);
    if(!project){
      throw new NotAcceptableException("Project cannot be created. Please try again.");
    }
    return project;
  }

  @Get()
  @ApiResponse({status: 200, type: [CreateProjectDto]})
  findAll(@Query('offset') offset: number) {
    return this.projectService.getAllProject(offset);
  }

  @Get('/find/:code')
  @ApiResponse({status: 200, type: CreateProjectDto})
  findOne(@Param('code') code: string) {
    console.log(code);
    return this.projectService.findOne(code);
  }

  @Get('/search')
  @ApiResponse({status: 200, type: CreateProjectDto })
  search(
    @Query('name') name: string, @Query('type') type: number, @Query('offset') offset: number
  ) {
    return this.projectService.searchProject(name, type, offset);
  }

  @ApiResponse({status: 200, type: CreateProjectDto })
  @Put(':code')
  update(@Param('code') code: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.updateProject(code, updateProjectDto);
  }

  @Delete(':code')
  @ApiResponse({status: 200, type: Number })
  remove(@Param('code') code: string) {
    return this.projectService.deleteProject(code);
  }

}
