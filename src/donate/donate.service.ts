import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonateDto } from './dto/create-donate.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Donate } from './models/donate.model';

@Injectable()
export class DonateService {
  constructor(
      @InjectModel(Donate)
      private readonly donateModel: typeof Donate
    ) {}
    create(createDonateDto: CreateDonateDto) {
      return this.donateModel.create(createDonateDto);
    }
  
    findAll() {
      return this.donateModel.findAll({
        include: { all: true },
      });
    }
  
    async findOne(id: number) {
      const donate = await this.donateModel.findByPk(id, {
        include: { all: true },
      });
      if (!donate) {
        throw new NotFoundException(`Donate with ID ${id} not found`);
      }
      return donate;
    }
  
    async update(id: number, updateDonateDto: UpdateDonateDto) {
      const donate = await this.donateModel.findByPk(id);
      if (!donate) {
        throw new NotFoundException(`Donate with ID ${id} not found`);
      }
      return this.donateModel.update(updateDonateDto, { where: { id } });
    }
  
    async remove(id: number) {
      const donate = await this.findOne(id);
      await donate.destroy();
      return { message: `Donate with ID ${id} deleted successfully` };
    }
}
