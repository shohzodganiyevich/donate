import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

enum Statuses {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export class CreateOrderDto {
  @ApiProperty({ example: 200 })
  @IsNumber({}, { message: "sum must be a number" })
  sum: number;

  @ApiProperty({ example: "New York, 5th Avenue 12" })
  @IsString({ message: "location must be a string" })
  location: string;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: "user_id must be a number" })
  user_id: number;

  @ApiProperty({ example: 2 })
  @IsNumber({}, { message: "shop_id must be a number" })
  shop_id: number;

  @ApiProperty({ example: "pending", enum: Statuses })
  @IsEnum(Statuses, {
    message: "status must be pending, completed or cancelled",
  })
  status: Statuses;
}
