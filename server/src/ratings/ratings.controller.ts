import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';


@Controller('ratings')
export class RatingsController {

  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    try {
      return this.ratingsService.create(createRatingDto);
    } catch(e){
        return e
    }
  }

  @Get(':id/:characterName')
  findOne(@Param('id') id: number, @Param('characterName') charactername: string) {

    return this.ratingsService.findOne(+id, charactername);

  }

  @Get(':id')
  findAllbyUserID(@Param('id') id: number) {
    return this.ratingsService.findAllByUserID(id);
  }


  @Patch(':id')
  update(@Body() data: UpdateRatingDto) {
    return this.ratingsService.update(data);
  }

  @Delete(':id')
  deleteByUserID(@Param('id') id: number) {
    return this.ratingsService.deleteByUserID(id);
  }

}
