import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSocialMediaDto {
  @ApiProperty({ example: "Instagram", description: "Ijtimoiy tarmoq nomi" })
  @IsString()
  @IsNotEmpty()
  social_media: string;

  @ApiProperty({
    example: "https:/rasiimlar.com/yomonrasmlar/zor-rasm.jpg",
  })
  @IsString()
  iconic_url: string;
}
