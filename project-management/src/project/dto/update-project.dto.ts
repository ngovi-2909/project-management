import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import {IsBoolean, IsNotEmpty, IsNumber, IsString, Matches, MaxLength} from 'class-validator';
import { ProjectType } from "../../project-type/entities/project-type.entity";
import { ApiProperty, ApiResponse } from "@nestjs/swagger";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({type: String, description: 'The project name of the project' , example: 'project name'})
  @IsString()
  @Matches(/^[a-zA-Z0-9\u3040-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\s]+$/, { // Match Japan characters
    message: 'Project name must contain only letters, numbers, and spaces',
  })
  @MaxLength(200)
  name: string;

  @ApiProperty({type: Number, example: 1, nullable: false, description: "project type"})
  project_type_id: number;

  @ApiProperty({type: Boolean, example: true, nullable: false, description: "project status"})
  @IsBoolean()
  status: boolean;
}
