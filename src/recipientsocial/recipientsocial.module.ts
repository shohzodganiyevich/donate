import { Module } from '@nestjs/common';
import { RecipientsocialService } from './recipientsocial.service';
import { RecipientsocialController } from './recipientsocial.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipientsocial } from './models/recipientsocial.model';

@Module({
  imports:[SequelizeModule.forFeature([Recipientsocial])],
  controllers: [RecipientsocialController],
  providers: [RecipientsocialService],
})
export class RecipientsocialModule {}
