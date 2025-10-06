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
import { ShopService } from "./shop.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";

@ApiTags("Shop")
@Controller("shop")
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @ApiOperation({ summary: "Yangi mahsulot yaratish" })
  @ApiResponse({ status: 201 })
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha mahsulotlarni olish" })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.shopService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha mahsulotni olish" })
  @ApiResponse({ status: 200 })
  findOne(@Param("id") id: string) {
    return this.shopService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mahsulotni yangilash" })
  @ApiResponse({ status: 200 })
  update(@Param("id") id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Mahsulotni o'chirish" })
  @ApiResponse({ status: 200 })
  remove(@Param("id") id: string) {
    return this.shopService.remove(+id);
  }
}
