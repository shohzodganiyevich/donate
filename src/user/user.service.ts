import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({
      where: { id },
      include: { all: true },
    });

    if (!user) {
      throw new NotFoundException(`#${id}lik User topilmadi `);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`#${id}lik User topilmadi `);
    }

    return this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`#${id}lik User topilmadi `);
    }

    return this.userModel.destroy({ where: { id } });
  }
}
