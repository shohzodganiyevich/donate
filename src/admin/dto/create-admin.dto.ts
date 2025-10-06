import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "John Doe" })
  @IsString({ message: "full_name must be a string" })
  @IsNotEmpty({ message: "full_name should not be empty" })
  full_name: string;

  @ApiProperty({ example: "john@example.com" })
  @IsEmail({}, { message: "email must be a valid email address" })
  @IsNotEmpty({ message: "email should not be empty" })
  email: string;

  @ApiProperty({ example: "password123" })
  @IsString({ message: "password must be a string" })
  @MinLength(6, { message: "password must be at least 6 characters long" })
  password: string;

  @ApiProperty({ example: true })
  @IsBoolean({ message: "is_active must be a boolean value" })
  is_active: boolean;
}
