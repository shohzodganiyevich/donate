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
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@ApiTags("Categories")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: "Yangi kategoriya yaratish" })
  @ApiResponse({ status: 201 })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kategoriyalarni olish" })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha kategoriya olish" })
  @ApiResponse({ status: 200 })
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Kategoriya yangilash" })
  @ApiResponse({ status: 200 })
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Kategoriya o'chirish" })
  @ApiResponse({ status: 200 })
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
