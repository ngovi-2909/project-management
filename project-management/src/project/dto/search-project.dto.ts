import {IsNotEmpty, IsNumber, IsString, Matches, MaxLength} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SearchProjectDto{
  @ApiProperty({type: String, description: 'Search project', example: 'Project 1'})
  @IsString({message: 'Name must be a string'})
  @Matches(/^[a-zA-Z0-9\u3040-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\s]+$/, { // Match Japan characters
    message: 'Project name must contain only letters, numbers, and spaces',
  })
  @MaxLength(200)
  name: string;

  @ApiProperty({type: Number, description: 'Search project', example: 1})
  type: number;
}