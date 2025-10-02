import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialmediaService } from './socialmedia.service';
import { CreateSocialmediaDto } from './dto/create-socialmedia.dto';
import { UpdateSocialmediaDto } from './dto/update-socialmedia.dto';

@Controller('socialmedia')
export class SocialmediaController {
  constructor(private readonly socialmediaService: SocialmediaService) {}

  @Post()
  create(@Body() createSocialmediaDto: CreateSocialmediaDto) {
    return this.socialmediaService.create(createSocialmediaDto);
  }

  @Get()
  findAll() {
    return this.socialmediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialmediaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialmediaDto: UpdateSocialmediaDto) {
    return this.socialmediaService.update(+id, updateSocialmediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialmediaService.remove(+id);
  }
}
