import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipientsocialService } from './recipientsocial.service';
import { CreateRecipientsocialDto } from './dto/create-recipientsocial.dto';
import { UpdateRecipientsocialDto } from './dto/update-recipientsocial.dto';

@Controller('recipientsocial')
export class RecipientsocialController {
  constructor(private readonly recipientsocialService: RecipientsocialService) {}

  @Post()
  create(@Body() createRecipientsocialDto: CreateRecipientsocialDto) {
    return this.recipientsocialService.create(createRecipientsocialDto);
  }

  @Get()
  findAll() {
    return this.recipientsocialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientsocialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipientsocialDto: UpdateRecipientsocialDto) {
    return this.recipientsocialService.update(+id, updateRecipientsocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipientsocialService.remove(+id);
  }
}
