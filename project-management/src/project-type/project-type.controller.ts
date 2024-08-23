import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { ProjectTypeService } from './project-type.service';
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('api/v1/project-type')
export class ProjectTypeController {
  constructor(private readonly projectTypeService: ProjectTypeService) {}
  @ApiResponse({ status: 200, type: CreateProjectTypeDto })
  @Post()
  create(@Body() createProjectTypeDto: CreateProjectTypeDto) {
    return this.projectTypeService.create(createProjectTypeDto);
  }

  @ApiResponse({status: 200, type: [CreateProjectTypeDto]})
  @Get()
  findAll() {
    return this.projectTypeService.findAll();
  }

  @ApiResponse({ status: 200, type: CreateProjectTypeDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectTypeService.findOne(+id);
  }

  @ApiResponse({ status: 200, type: UpdateProjectTypeDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectTypeDto: UpdateProjectTypeDto) {
    return this.projectTypeService.update(+id, updateProjectTypeDto);
  }

  @ApiResponse({ status: 200, type: UpdateProjectTypeDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTypeService.remove(+id);
  }
}
