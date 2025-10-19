import {useCallback, useEffect, useState } from "react"
import useApi from "./api"
import { PaginatedResponse, usePagination } from "./pagination"
import { Type } from "./types"
import { PAGINATION_INIT_OPTIONS } from "@/utils/constant"
import { Category } from "./categories"

export type StockInputs = {
    quantity: number;
    size: string;
    color: string;
    description: string;
    imageIds: string[]
}
export type ProductInputs = {
  title: string;
  description: string;
  typeId: string;
  categoryId: string
  price: number
  stocks: StockInputs[]
}
export type Product = {
    id: string
    title: string
    type: Type
    category: Category
    isActive: boolean
}
export const useProducts = () => {
    const [data,setData] = useState<PaginatedResponse<Product>>()
    const api = useApi()
const headers = [
    {title: 'Title', key: 'title' },
    {title: 'Type', key: 'type' },
    {title: 'isActive', key: 'isActive' },
]

const [paginationOption, setPaginationOption] = useState(PAGINATION_INIT_OPTIONS)

const fetchProductsCallback= useCallback(()=>{
        return api<PaginatedResponse<Product>>('/goods','GET',{
          config: {
            params: paginationOption
          }
        }).then((response)=>setData(response))
    },[paginationOption])
    

    useEffect(()=>{
        fetchProductsCallback()
    },[fetchProductsCallback])

    return {
        headers,
        data,
        fetchProductsCallback,
        paginationOption,
        setPaginationOption
    }
}

export const useProduct = () =>{
    const api = useApi()

    const fetchProduct = useCallback((id: string)=>{
        return api<Product>(`/goods/${id}`,'GET')
    },[api])
    
    return {
        fetchProduct
    }
}