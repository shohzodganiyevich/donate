import { Injectable } from "@nestjs/common";
import { CreateRecipientDto } from "./dto/create-recipient.dto";
import { UpdateRecipientDto } from "./dto/update-recipient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Recipient } from "./models/recipient.model";

@Injectable()
export class RecipientService {
  constructor(
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient
  ) {}
  create(createRecipientDto: CreateRecipientDto) {
    return this.recipientModel.create(createRecipientDto);
  }

  findAll() {
    return this.recipientModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.recipientModel.findByPk(id);
  }

  async update(id: number, updateRecipientDto: UpdateRecipientDto) {
    const conditate = await this.recipientModel.findByPk(id);
    if (!conditate) {
      return { message: "Bunday recipient mavjud emas" };
    }

    const recipient = await this.recipientModel.update(updateRecipientDto, {
      where: { id },
      returning: true,
    });
    return recipient[1][0];
  }

  async remove(id: number) {
    const delCount = await this.recipientModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday recipient mavjud emas" };
    }
    return { message: "Recipient o'chirildi", id };
  }
}
