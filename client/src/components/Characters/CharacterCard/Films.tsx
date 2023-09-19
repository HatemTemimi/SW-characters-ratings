import { LinearProgress, Stack, Typography } from "@mui/material";
import useGetFilms from "hooks/useGetFilms";
import { filmProps } from "types/props";


export default function Films(props: filmProps){

  const { urls, set_arr, name } = props

  const { isLoading, isRefetching, films }  = useGetFilms(urls, set_arr, name)

  if(isLoading || isRefetching) return (
    <Stack sx={{ width: '100%', mt:2 }} minHeight={'10rem'}>
      <LinearProgress color="success" />
    </Stack>
  )
  return(
      <Typography variant='caption' minHeight={'10rem'}>
        {films}
      </Typography>
  )


}
