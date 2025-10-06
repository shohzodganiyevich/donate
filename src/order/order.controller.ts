import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@ApiTags("Orders")
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: "Yangi buyurtma yaratish" })
  @ApiResponse({ status: 201 })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha buyurtmalarni olish" })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha buyurtmani olish" })
  @ApiResponse({ status: 200 })
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Buyurtmani yangilash" })
  @ApiResponse({ status: 200 })
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Buyurtmani o'chirish" })
  @ApiResponse({ status: 200 })
  remove(@Param("id") id: string) {
    return this.orderService.remove(+id);
  }
}
