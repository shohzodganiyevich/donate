import { Injectable } from "@nestjs/common";
import { CreateRecipientsocialDto } from "./dto/create-recipientsocial.dto";
import { UpdateRecipientsocialDto } from "./dto/update-recipientsocial.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Recipientsocial } from "./models/recipientsocial.model";

@Injectable()
export class RecipientsocialService {
  constructor(
    @InjectModel(Recipientsocial)
    private readonly recipientsocialModel: typeof Recipientsocial
  ) {}
  create(createRecipientsocialDto: CreateRecipientsocialDto) {
    return this.recipientsocialModel.create(createRecipientsocialDto);
  }

  findAll() {
    return this.recipientsocialModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.recipientsocialModel.findByPk(id);
  }

  async update(id: number, updateRecipientsocialDto: UpdateRecipientsocialDto) {
    const conditate = await this.recipientsocialModel.findByPk(id);
    if (!conditate) {
      return { message: "Bunday recipient social mavjud emas" };
    }

    const recipient_social = await this.recipientsocialModel.update(
      updateRecipientsocialDto,
      {
        where: { id },
        returning: true,
      }
    );
    return recipient_social[1][0];
  }

  async remove(id: number) {
    const delCount = await this.recipientsocialModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday recipient social mavjud emas" };
    }
    return { message: "Recipient social o'chirildi", id };
  }
}
