import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { RecipientService } from "./recipient.service";
import { CreateRecipientDto } from "./dto/create-recipient.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Recipient } from "./models/recipient.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("Recipients")
@Controller("recipients")
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @ApiOperation({ summary: "Yangi recipient qo'shish" })
  @ApiResponse({ status: 201, type: Recipient })
  create(@Body() dto: CreateRecipientDto) {
    return this.recipientService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha recipientlarni olish" })
  @ApiResponse({ status: 200, type: [Recipient] })
  findAll() {
    return this.recipientService.findAll();
  }

  @UseGuards(JwtAuthGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID orqali recipientni olish" })
  @ApiResponse({ status: 200, type: Recipient })
  findOne(@Param("id") id: number) {
    return this.recipientService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, SelfGuard)
  @Put(":id")
  @ApiOperation({ summary: "Recipientni yangilash" })
  @ApiResponse({ status: 200, type: Recipient })
  update(@Param("id") id: number, @Body() dto: CreateRecipientDto) {
    return this.recipientService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Recipientni o'chirish" })
  remove(@Param("id") id: number) {
    return this.recipientService.remove(id);
  }
}
