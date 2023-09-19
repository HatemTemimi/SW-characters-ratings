import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilms } from "api/characters";
import { Dispatch, SetStateAction, useState } from "react";
import Films from "types/films";

const useGetFilms = (urls:string[],  set_arr:  Dispatch<SetStateAction<Films[]>> | null,name: string)=> {

  const queryClient = useQueryClient();

  const [films, setFilms] = useState<string[]>([])

  const key = ['films'];

  const data = queryClient.getQueryData<string[]>(key);

  const queryResult = useQuery(['films', urls], () => getFilms(urls), {
    onSuccess: (data:any)=>{
      const films: string[] = []
      data.forEach((d:any)=>{
        films.push(d?.data.title + ', ')
      })
      setFilms(films)
      set_arr &&  set_arr(prev => [...prev, {name:name, movies:films}] )
    }
  })

  return { ...queryResult, data: data || queryResult.data, films };
}

export default useGetFilms