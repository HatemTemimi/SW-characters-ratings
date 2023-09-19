import { Register, SignIn } from 'types/user'
import axios from './config/axios'

export const login = async (signIn: SignIn | null)=>{
    try {
        const response = await axios.post('auth/login', {
            username: signIn?.username,
            password: signIn?.password
        })
        return response.data
    } catch(e){
        return e
    }
}

export const register = async (signUp: Register) => {
    try {
        const response = await axios.post('auth/register', signUp)
        return response.data
    } catch(e){
        return e
    }
}
