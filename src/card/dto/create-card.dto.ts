import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCardDto {
  @ApiProperty({
    example: "visa",
    enum: ["humo", "visa", "uzcard"],
    description: "Karta turi",
  })
  card_type: string;
  @ApiProperty({ description: "Karta raqami" })
  @IsString()
  @Length(16)
  card_number: string;
  @ApiProperty({ example: 1, description: "Recipient ID" })
  @IsInt()
  recipientId: number;
  @ApiProperty({ example: "12/26", description: "Amal qilish muddati" })
  @IsString()
  @IsNotEmpty()
  expiry_date: string;
}
