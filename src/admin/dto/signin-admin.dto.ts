import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SigninAdminDto {
  @ApiProperty({ example: "john@example.com" })
  @IsEmail({}, { message: "email must be a valid email address" })
  @IsNotEmpty({ message: "email should not be empty" })
  email: string;

  @ApiProperty({ example: "password123" })
  @IsString({ message: "password must be a string" })
  @MinLength(6, { message: "password must be at least 6 characters long" })
  password: string;
}
