import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CharactersService {
  
  async getCharacters(page: string){
      return  await axios.get(`https://swapi.dev/api/people/?page=${page}`)
  } 
      
}
