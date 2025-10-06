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
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("Users")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Yangi foydalanuvchi yaratish" })
  @ApiResponse({ status: 201 })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchilarni olish" })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha foydalanuvchini olish" })
  @ApiResponse({ status: 200 })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Foydalanuvchini yangilash" })
  @ApiResponse({ status: 200 })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  @ApiResponse({ status: 200 })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
