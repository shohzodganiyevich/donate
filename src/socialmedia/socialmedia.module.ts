import { Module } from '@nestjs/common';
import { SocialmediaService } from './socialmedia.service';
import { SocialmediaController } from './socialmedia.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Socialmedia } from './models/socialmedia.model';

@Module({
  imports:[SequelizeModule.forFeature([Socialmedia])],
  controllers: [SocialmediaController],
  providers: [SocialmediaService],
})
export class SocialmediaModule {}
