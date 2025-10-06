import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Shop } from "./model/shop.model";

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop)
    private readonly shopModel: typeof Shop
  ) {}

  create(createShopDto: CreateShopDto) {
    return this.shopModel.create(createShopDto);
  }

  findAll() {
    return this.shopModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const shop = await this.shopModel.findByPk(id, {
      include: { all: true },
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
    return shop;
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const shop = await this.shopModel.findByPk(id);
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
    return this.shopModel.update(updateShopDto, { where: { id } });
  }

  async remove(id: number) {
    const shop = await this.findOne(id);
    await shop.destroy();
    return { message: `Shop with ID ${id} deleted successfully` };
  }
}
