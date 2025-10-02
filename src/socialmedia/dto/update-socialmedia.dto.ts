import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialmediaDto } from './create-socialmedia.dto';

export class UpdateSocialmediaDto extends PartialType(CreateSocialmediaDto) {}
