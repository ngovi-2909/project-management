import {
    IsBoolean,
    IsNotEmpty,
    IsNumberString,
    IsString, Length,
    Matches,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({type: String, example: "111111", nullable: false, description: "project code"})
    @IsNumberString()
    @IsNotEmpty()
    @Length(6, 6)
    code: string;

    @ApiProperty({type: String,example: "Project name", nullable: false, description: 'project name'})
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9\u3040-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\s]+$/, { // Match Japan characters
        message: 'Project name must contain only letters, numbers, and spaces',
    })
    @MaxLength(200)
    name: string;

    @ApiProperty({type: Boolean, example: true, nullable: false, description: "project status"})
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    @ApiProperty({type: Number, example: 1, nullable: false, description: "project type"})
    @IsNotEmpty()
    project_type_id: number;

}
