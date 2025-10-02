import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipientsocialDto } from './create-recipientsocial.dto';

export class UpdateRecipientsocialDto extends PartialType(CreateRecipientsocialDto) {}
