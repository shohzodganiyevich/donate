import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    // private readonly jwtService: JwtService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPass = await bcrypt.hash(createAdminDto.password, 7);
    createAdminDto.password = hashedPass;

    return this.adminModel.create({ ...createAdminDto, is_creator: false });
  }

  findAll() {
    return this.adminModel.findAll();
  }

  async findOneByEmail(email: string) {
    const admin = await this.adminModel.findOne({ where: { email } });
    return admin?.dataValues;
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }

    return this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`#${id}lik Admin topilmadi `);
    }

    return this.adminModel.destroy({ where: { id } });
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updateUser = await this.adminModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updateUser[1][0]) {
      throw new BadRequestException("User already activetes");
    }
    return {
      message: "User activated successFully",
      is_active: updateUser[1][0].is_active,
    };
  }
}
