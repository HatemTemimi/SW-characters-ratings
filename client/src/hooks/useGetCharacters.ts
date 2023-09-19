import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCharacters } from "api/characters";
import { useState } from "react";
import { Character } from "types/characters";

const useGetCharacters = (page:any)=> {

  const [characters, setCharacters] = useState<Character[]>([])

  const queryClient = useQueryClient();

  const key = ['characters'];

  const data = queryClient.getQueryData<any>(key);

  const queryResult = useQuery(['characters', page], () => getCharacters(page), {
    onSuccess: (data)=>{
      setCharacters(data.results)
    }
  })

  return { ...queryResult, data: data || queryResult.data , characters};
}

export default useGetCharacters