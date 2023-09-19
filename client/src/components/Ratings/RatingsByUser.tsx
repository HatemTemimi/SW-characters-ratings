import { Box, Button, CircularProgress, Grid, Stack } from '@mui/material'
import { deleteRatesByUser, getRatesByUser } from 'api/ratings'
import CharacterCard from 'components/Characters/CharacterCard/CharacterCard'
import { useAuthContext } from 'hooks/useAuthContext'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { rating } from 'types/ratings'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Ratings() {

  const [ratings, setRatings] = useState<rating[]>()

  const { user } = useAuthContext()

  const {isLoading, isSuccess} = useQuery(['ratings', user?.id], () => getRatesByUser(user?.id), {
    onSuccess: (data)=>{
      setRatings(data ?? [])
    }
  })

  const { mutate } = useMutation(deleteRatesByUser, {
        onSuccess: () => {
          setRatings([])
         },
  })

  const handleDelete = ()=>{
    if(user && user.id){
      mutate(user?.id)
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }} justifyContent={"center"} alignItems={"center"}>
        <CircularProgress color='warning' sx={{ mt: "30%" }} size={"3rem"} />
      </Box>
    )
  }

  if(isSuccess){
    return (
      <Box sx={{ mt: 4 }} >
        <Box sx={{ flexGrow: 1 }}>
          <Stack alignItems={'flex-start'}>
            <Button startIcon={<DeleteIcon />} onClick={handleDelete} size='small' variant="outlined" color="error">
              Delete All
            </Button>
          </Stack>
          <Grid mt={1} spacing={3} container>
            { ratings && ratings.map((rating, index: number) => {
              return (
                <Grid columnGap={3} item md={4} sm={6} xs={12}  key={index}>
                  <CharacterCard set_arr={null}  homeworld={null} name={rating.characterName} films={null} birth_year={null} />
                </Grid>
                )
            })}
          </Grid>
        </Box>
      </Box>
    )
  }

}
