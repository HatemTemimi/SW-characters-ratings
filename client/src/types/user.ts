export type UserSession =  {
  id: number
  username: string
  access_token: string
} | null

export type SignIn = {
    username: string
    password: string
}

export type Register = {
    email: string
    name: string
    username: string
    password: string
}

