import { Module } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Shop } from "./model/shop.model";
import { Category } from "../category/models/category.model";
import { Recipient } from "../recipient/models/recipient.model";

@Module({
  imports: [SequelizeModule.forFeature([Shop, Category, Recipient])],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
