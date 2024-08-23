import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectTypeDto {
  @ApiProperty({type: String, example: "Project type", nullable: false, description: "project type"})
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: 'Project name must contain only letters, numbers, and spaces',
  })
  name: string;


}
