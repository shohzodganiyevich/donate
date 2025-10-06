import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Registration" })
  @ApiResponse({ status: 200, description: "Success registered" })
  signin(@Body() signinAdminDto: SigninAdminDto) {
    return this.authService.signin(signinAdminDto);
  }
}
