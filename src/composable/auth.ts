import useApi from "./api"
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux'
import {logout, save } from '@/store/slice/authSlice'
import { Local_STORAGE_TOKEN_KEY } from "@/utils/constant";

export type User = {
  id: number,
  firstName: string
}

export interface AuthResponse {
  user: User
  access_token: string
}

export function useAuth(){

    const api = useApi()
    const router = useRouter()
  const dispatch = useDispatch()

    async function login(phone: string, password: string){

      const data =  await api<AuthResponse>('/auth/login','POST', { data: { phone, password } })
    
      if(data.access_token){
      localStorage.setItem(Local_STORAGE_TOKEN_KEY, data.access_token);
      dispatch(save(data))
      router.push('/')
    }
    }

    function signOut(){
      localStorage.removeItem(Local_STORAGE_TOKEN_KEY)
      dispatch(logout())
    }

    return {
      login,
      signOut
  }
}