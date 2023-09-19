import { Controller, Get, Param } from '@nestjs/common';
import { CharactersService } from './characters.service';


@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get(':page')
  async findAll(@Param('page') page:string){
    try {
      const characters =  await this.charactersService.getCharacters(page)
      return characters.data
    } catch (error) {
      return error
    }
  }
}
