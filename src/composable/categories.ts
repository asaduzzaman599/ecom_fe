import {useCallback, useEffect, useState } from "react"
import useApi from "./api"
import { PaginatedResponse, usePagination } from "./pagination"
import { Type } from "./types"
import { PAGINATION_INIT_OPTIONS } from "@/utils/constant"

export type Category = {
    id: string
    title: string
    type: Type
    isActive: boolean
}
export const useCategories = () => {
    const [data,setData] = useState<PaginatedResponse<Category>>()
    const api = useApi()
    const pagination = usePagination()
const headers = [
    {title: 'Title', key: 'title' },
    {title: 'Type', key: 'type.title' },
    {title: 'isActive', key: 'isActive' },
]

const [paginationOption, setPaginationOption] = useState(PAGINATION_INIT_OPTIONS)

const fetchCategoriesCallback= useCallback(()=>{
        return api<PaginatedResponse<Category>>('/categories','GET',{
          config: {
            params: paginationOption
          }
        })
    },[paginationOption])
    

    useEffect(()=>{
        fetchCategoriesCallback().then((response)=>setData(response))
    },[fetchCategoriesCallback])

    return {
        headers,
        data,
        fetchCategoriesCallback,
        paginationOption,
        setPaginationOption
    }
}

export const useCategory = () =>{
    const api = useApi()

    const fetchCategory = useCallback((id: string)=>{
        return api<Category>(`/categories/${id}`,'GET')
    },[api])
    
    return {
        fetchCategory
    }
}