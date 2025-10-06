import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { SelfGuard } from "../common/guards/self.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CreatorGuard } from "../common/guards/creator.guard";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, CreatorGuard)
  @Post()
  @ApiOperation({ summary: "Create admin" })
  @ApiResponse({ status: 201, description: "Admin successfully created" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard, CreatorGuard)
  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, description: "List of admins" })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get admin by ID" })
  @ApiResponse({ status: 200, description: "Admin data" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update admin" })
  @ApiResponse({ status: 200, description: "Admin updated" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(JwtAuthGuard, SelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete admin" })
  @ApiResponse({ status: 200, description: "Admin deleted" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
