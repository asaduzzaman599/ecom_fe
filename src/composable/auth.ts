import useApi from "./api"
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux'
import {save } from '@/store/slice/authSlice'

export function useAuth(){

    const api = useApi()
    const router = useRouter()
  const dispatch = useDispatch()

    async function login(phone: string, password: string){

      const response = await api.post('/auth/login', { phone, password })
      dispatch(save(response))
       router.push('/')
    }

    return {login}
}