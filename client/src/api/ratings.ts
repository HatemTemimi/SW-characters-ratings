import { rating } from '../types/ratings'
import axios from './config/axios'

export const rate = async (rating: rating | undefined)=>{
    const response = await axios.post('ratings/', {
        userID: rating?.userID,
        characterName: rating?.characterName,
        value: rating?.value
    })
    return response.data
}

export const getRate = async (userID: number | undefined, characterName: string)=>{
    const response = await axios.get(`ratings/${userID}/${characterName}`)
    return response.data
}

export const getRatesByUser = async (userID: number | undefined)=>{
    try {
        if(userID){
        const response = await axios.get(`ratings/${userID}`)
        return response.data
        }
    } catch (e){
        return e
    }
}

export const deleteRatesByUser = async (userID: number | undefined)=>{
    const response = await axios.delete(`ratings/${userID}`)
    return response.data
}

