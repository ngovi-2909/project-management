import {IsNotEmpty, IsNumber, IsString, Matches, MaxLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectTypeDto {
  @ApiProperty({type: String, example: "Project type", nullable: false, description: "project type"})
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\u3040-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\s]+$/, { // Match Japan characters
    message: 'Project name must contain only letters, numbers, and spaces',
  })
  @MaxLength(100)
  name: string;


}
