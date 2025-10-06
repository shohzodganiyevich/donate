import { Module } from "@nestjs/common";
import { DonateService } from "./donate.service";
import { DonateController } from "./donate.controller";
import { User } from "../user/models/user.model";
import { Recipient } from "../recipient/models/recipient.model";
import { Donate } from "./models/donate.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Donate, Recipient, User])],
  controllers: [DonateController],
  providers: [DonateService],
  exports: [DonateService],
})
export class DonateModule {}
