import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectTypeDto } from './create-project-type.dto';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateProjectTypeDto extends PartialType(CreateProjectTypeDto) {
  @ApiProperty({type: String, example: "Project type", nullable: false, description: "project type"})
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: 'Project name must contain only letters, numbers, and spaces',
  })
  name: string;
}
