import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../admin/models/admin.model";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  private async genereteTokens(admin: Admin) {
    const paylod = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(paylod, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(paylod, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
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

    return this.genereteTokens(admin);
  }

  async logout(refreshToken: string, res: Response) {
    const adminDate = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminDate) {
      throw new ForbiddenException("User not varified");
    }
    const admin = await this.adminService.findOne(adminDate.id);
    if (!admin) {
      throw new BadRequestException("Notog'ri token");
    }
    admin.token = "";
    await admin.save();

    res.clearCookie("refreshToken");
    return {
      message: "User Loged out",
    };
  }

  async refreshToken(adminId: number, token: string, res: Response) {
    const decodToken = await this.jwtService.decode(token);

    if (adminId !== decodToken["id"]) {
      throw new ForbiddenException("Ruxsat erilmagan id");
    }
    const admin = await this.adminService.findOne(adminId);

    if (!admin || !admin.token) {
      throw new ForbiddenException("Foribbden");
    }

    const { accessToken, refreshToken } = await this.genereteTokens(admin);
    admin.token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      message: "User refreshed",
      adminId: admin.id,
      accessToken,
    };
  }
}
