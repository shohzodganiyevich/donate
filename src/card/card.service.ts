import { Injectable } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Card } from "./models/card.model";

@Injectable()
export class CardService {
  constructor(@InjectModel(Card) private readonly cardModel: typeof Card) {}

  create(createCardDto: CreateCardDto) {
    return this.cardModel.create(createCardDto);
  }

  findAll() {
    return this.cardModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.cardModel.findByPk(id);
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const conditate = await this.cardModel.findByPk(id);
    if (!conditate) {
      return { message: "Bunday card mavjud emas" };
    }

    const card = await this.cardModel.update(updateCardDto, {
      where: { id },
      returning: true,
    });
    return card[1][0];
  }

  async remove(id: number) {
    const delCount = await this.cardModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday card mavjud emas" };
    }
    return { message: "Card o'chirildi", id };
  }
}
