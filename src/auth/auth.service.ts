import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../admin/models/admin.model";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  private async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    };

    return { token: this.jwtService.sign(payload) };
  }

  async signin(signinAdminDto: SigninAdminDto) {
    const admin = await this.adminService.findOneByEmail(signinAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException("Email yoki password hato");
    }
    // console.log(admin);

    const verifyPassword = await bcrypt.compare(
      signinAdminDto.password,
      admin.password
    );

    if (!verifyPassword) {
      throw new UnauthorizedException("Email yoki password hato");
    }

    return this.generateToken(admin);
  }
}
