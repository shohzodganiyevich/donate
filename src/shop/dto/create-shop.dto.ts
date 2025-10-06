import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateShopDto {
  @ApiProperty({ example: "T-shirt" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  count: number;

  @ApiProperty({ example: 19.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: "Blue cotton T-shirt" })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  recipient_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  category_id: number;

  @ApiProperty({ example: "High quality cotton T-shirt" })
  @IsOptional()
  @IsString()
  description: string;
}
