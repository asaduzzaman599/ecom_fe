import { useCallback, useEffect, useState } from "react"
import useApi from "./api"
import { PaginatedResponse } from "./pagination"
import { PAGINATION_INIT_OPTIONS } from "@/utils/constant"

export type Type = {
    id: string
    title: string
    isActive: boolean
}
export const useTypes = () => {
    const [data,setData] = useState<PaginatedResponse<Type>>()
    const api = useApi()
const headers = [
    {title: 'Title', key: 'title' },
    {title: 'Active Status', key: 'isActive' },
]
const [paginationOption, setPaginationOption] = useState(PAGINATION_INIT_OPTIONS)

const fetchTypesCallback = useCallback(()=>{
        return api<PaginatedResponse<Type>>('/types','GET',{
          config: {
            params: paginationOption
          }
        }).then((response: PaginatedResponse<Type>)=>{setData(response)})
    },[paginationOption])
    

    useEffect(()=>{
        fetchTypesCallback()
    },[])

    return {
        headers,
        data,
        fetchTypesCallback,
        paginationOption,
        setPaginationOption
    }
}

export const useType = () =>{
    const api = useApi()

    const fetchType = useCallback((id: string)=>{
        return api<Type>(`/types/${id}`,'GET')
    },[])
    
    return {
        fetchType
    }
}