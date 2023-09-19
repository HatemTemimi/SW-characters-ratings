import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('ratings')
export class RatingsController {

  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    try {
      return this.ratingsService.create(createRatingDto);
    } catch(err){
        return err
    }
  }

  @Get(':id/:characterName')
  findOne(@Param('id') id: number, @Param('characterName') charactername: string) {
    try {
      return this.ratingsService.findOne(+id, charactername);
    } catch (err) {
      return err
    }
  }

  @Get(':id')
  findAllbyUserID(@Param('id') id: number) {
    try {
      return this.ratingsService.findAllByUserID(id);
    } catch (err) {
      return err
    }
  }


  @Patch(':id')
  update(@Body() data: UpdateRatingDto) {
    try {
      return this.ratingsService.update(data);
    } catch (err) {
      return err
    }
  }

  @Delete(':id')
  deleteByUserID(@Param('id') id: number) {
    try {
      return this.ratingsService.deleteByUserID(id);
    } catch (err) {
      return err
    }
  }

}
