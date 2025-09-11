import { useCallback, useState } from "react"
import useApi from "./api"
import { PaginatedResponse } from "./pagination"
import { PAGINATION_INIT_OPTIONS } from "@/utils/constant"
import { User } from "./auth"

export const useUsers = () => {
    const [data,setData] = useState<PaginatedResponse<User>>()
    const api = useApi()
const headers = [
    {title: 'Name', key: 'firstName' },
    {title: 'Phone', key: 'phone' },
    {title: 'Email', key: 'email' },
    {title: 'Roles', key: 'role' },
]
const [paginationOption, setPaginationOption] = useState(PAGINATION_INIT_OPTIONS)

const fetchUsersCallback = useCallback(()=>{
        return api<PaginatedResponse<User>>('/users','GET',{
          config: {
            params: paginationOption
          }
        }).then((response: PaginatedResponse<User>)=>{setData(response)})
    },[paginationOption])
    



    return {
        headers,
        data,
        fetchUsersCallback,
        paginationOption,
        setPaginationOption
    }
}

export const useUser = () =>{
    const api = useApi()

    const fetchUser = useCallback((id: string)=>{
        return api<User>(`/users/${id}`,'GET')
    },[])
    
    return {
        fetchUser
    }
}