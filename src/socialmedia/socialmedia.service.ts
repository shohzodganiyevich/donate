import { Injectable } from "@nestjs/common";
import { CreateSocialmediaDto } from "./dto/create-socialmedia.dto";
import { UpdateSocialmediaDto } from "./dto/update-socialmedia.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Socialmedia } from "./models/socialmedia.model";

@Injectable()
export class SocialmediaService {
  constructor(
    @InjectModel(Socialmedia)
    private readonly socialmediaModel: typeof Socialmedia
  ) {}
  create(createSocialmediaDto: CreateSocialmediaDto) {
    return this.socialmediaModel.create(createSocialmediaDto);
  }

  findAll() {
    return this.socialmediaModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.socialmediaModel.findByPk(id);
  }

  async update(id: number, updateSocialmediaDto: UpdateSocialmediaDto) {
    const conditate = await this.socialmediaModel.findByPk(id);
    if (!conditate) {
      return { message: "Bunday social media mavjud emas" };
    }

    const socialmedia = await this.socialmediaModel.update(
      updateSocialmediaDto,
      {
        where: { id },
        returning: true,
      }
    );
    return socialmedia[1][0];
  }

  async remove(id: number) {
    const delCount = await this.socialmediaModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday social media mavjud emas" };
    }
    return { message: "Social media o'chirildi", id };
  }
}
