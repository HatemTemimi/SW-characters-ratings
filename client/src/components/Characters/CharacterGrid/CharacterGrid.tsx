import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import CharacterCard from 'components/Characters/CharacterCard/CharacterCard';
import { Character } from 'types/characters';
import films from 'types/films';
import useGetCharacters from 'hooks/useGetCharacters';


export default function CharacterGrid() {
  // character by films
  const [films, setFilms] = useState<films[]>([])

  const [page, setPage] = useState<number>(1)

  const [allFilms, setAllFilms] = useState<string[]>([])

  const [search, setSearch] = useState<string>('')

  const { isLoading, data , characters ,isSuccess} = useGetCharacters(page);

  //set the search tool autocomplete values
  function setSearchValues(films:films[]){
    films.forEach((charWithFilms:films)=>{
      charWithFilms?.movies.forEach((m)=>{
        if(!allFilms.includes(m)){
          setAllFilms([...allFilms,m])
        }
      })
    })
  }

  useEffect(()=>{
    //setting the film search values
    setSearchValues(films)
  })

  const charsWithNoDups = search === '' ? [...new Set(films)]: [...new Set(films)].filter((c)=>{
      return c.movies.includes(search)
  })

  const filtered: Character[] = search === '' ? characters:
  characters.map((c:Character)=>{
      for(let i=0;i<charsWithNoDups.length;i++){
        if(charsWithNoDups[i].name === c.name){
          return c
        } 
      }
  }).filter((m:Character | undefined)=>{
      return m!==undefined
  })

  if (isLoading || characters.length === 0) {
    return (
      <Box sx={{ display: 'flex' }} justifyContent={"center"} alignItems={"center"}>
        <CircularProgress color='warning' sx={{ mt: "30%" }} size={"3rem"} />
      </Box>
    )
  }

  if (isSuccess){
    return (
    <Stack spacing={3} sx={{ mt: 3 }} >
      <Stack alignItems={"start"}>
        {
          allFilms.length > 0 ?
        <Autocomplete
          size='small'
          disablePortal
          id="search"
          options={allFilms}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Choose Movie" />}
          onInputChange={(_,v)=> setSearch(v)}
        /> : 
        <CircularProgress color='warning' size={'1.8rem'} sx={{ml:1}} />
        }
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {filtered.map((character: Character, index: number) => {
            return (
              <Grid xs={12} md={6} lg={6} key={index}>
                <CharacterCard set_arr={setFilms}  homeworld={character.homeworld} name={character.name} films={character.films} birth_year={character.birth_year} />
              </Grid>
            )}
          )}
        </Grid>
      </Box>
      <Divider/>
      <Stack alignItems={"center"} >
        <Pagination size='small' page={page} onChange={(_, p) => setPage(p)}
        count={Math.ceil(data?.count/characters?.length)} shape='rounded' variant="text" color="warning" />
      </Stack>
    </Stack>
  )}
}
