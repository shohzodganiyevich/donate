import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Jane Doe" })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: "jane@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "strongPassword1" })
  @IsString()
  @Length(6)
  password: string;

  @ApiProperty({ example: "8600123412341234" })
  @IsOptional()
  @IsString()
  card_number: string;
}
