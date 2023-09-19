import { Dispatch, SetStateAction } from "react"
import Films from "./films"

export type characterCardProps = {
  homeworld: string | null,
  name: string,
  films: string[] | null
  birth_year: string | null
  set_arr:  Dispatch<SetStateAction<Films[]>>| null
}

export type filmProps = {
  name: string
  urls: string[]
  set_arr:  Dispatch<SetStateAction<Films[]>> | null
}