import Pagination from "@/components/tailwindcss/Pagination"
import { use, useCallback, useEffect, useState } from "react"
import useApi from "./api"
import { PaginatedResponse, usePagination } from "./pagination"

export type Type = {
    id: string
    title: string
    isActive: boolean
}
export const useTypes = () => {
    const [data,setData] = useState<PaginatedResponse<Type>>()
    const api = useApi()
    const pagination = usePagination()
const headers = [
    {title: 'Title', key: 'title' },
    {title: 'isActive', key: 'isActive' },
]
const [paginationOption, setPaginationOption] = useState({
  page: 1,
  limit: 2
})

const fetchTypesCallback = useCallback(()=>{
        return api<PaginatedResponse<Type>>('/types','GET',{
          config: {
            params: paginationOption
          }
        })
    },[paginationOption])
    

    useEffect(()=>{
        fetchTypesCallback().then((response: PaginatedResponse<Type>)=>setData(response))
    },[paginationOption])

    const paginationCallBack = useCallback(()=>{
      return pagination({paginationOption, setPaginationOption, response: data })
    },[data, paginationOption])

    return {
        headers,
        data,
        paginationCallBack,
        fetchTypesCallback
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