import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./models/order.model";
import { Shop } from "../shop/model/shop.model";
import { User } from "../user/models/user.model";

@Module({
  imports: [SequelizeModule.forFeature([Order, Shop, User])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
