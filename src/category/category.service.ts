import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./models/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoryModel.update(updateCategoryDto, { where: { id } });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await category.destroy();
    return { message: `Category with ID ${id} deleted successfully` };
  }
}
