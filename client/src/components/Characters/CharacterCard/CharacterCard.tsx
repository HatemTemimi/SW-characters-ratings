import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import {Stack} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRate, rate } from 'api/ratings';
import { useAuthContext } from 'hooks/useAuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from 'utils/notify';
import Films from './Films';
import { characterCardProps } from 'types/props';


export default function CharacterCard(props: characterCardProps) {

  const { name, set_arr, films } = props

  const [ rating, setRating ] = useState<number | null>(null)

  const { user } = useAuthContext()

  const { mutate } = useMutation(rate, {
        onError: () => {
          notify(`Rating Error ❌`, false)
        },
  })

  useQuery(['rating', user?.id, name], () => getRate(user?.id, name), {
      onSuccess: (data)=>{
        setRating(data.value)
      }
  })

  return (
    <>
    <Card sx={{
        maxHeight:'12vh',
        ':hover': {
          boxShadow: 20,
      },
    }}>
    <CardActionArea>
        <CardContent sx={{display: 'flex', flexDirection:'column' }}>
          <Stack sx={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}} >
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Rating
                name="rating"
                value={rating ?? 0}
                onChange={(_, newValue) => {
                  setRating(newValue)
                  if(newValue == null){

                    notify(`Rating is Deleted for ${name} ❎`, false)

                  } else {
                    mutate({value: newValue, userID: user?.id, characterName: name })
                    notify(`Rating Added for ${name} ⭐`, false)
                  }
                }
                }
          />
          </Stack>
          <Stack>
              {
                films && <Films name={name} set_arr={set_arr} urls={films ? films : []}/>
              }
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
   </>
  );
}

