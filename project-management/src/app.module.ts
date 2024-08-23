import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { ProjectTypeModule } from './project-type/project-type.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'project-management',
    autoLoadModels: true,
    synchronize: true,
  }),ProjectModule, ProjectTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
