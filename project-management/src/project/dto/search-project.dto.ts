import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SearchProjectDto{
  @ApiProperty({type: String, description: 'Search project', example: 'Project 1'})
  @IsString({message: 'Name must be a string'})
  name: string;

  @ApiProperty({type: Number, description: 'Search project', example: 1})
  type: number;
}