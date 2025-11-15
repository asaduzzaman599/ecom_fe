import {useCallback, useEffect, useState } from "react"
import useApi from "./api"
import { PaginatedResponse, usePagination } from "./pagination"
import { Type } from "./types"
import { PAGINATION_INIT_OPTIONS } from "@/utils/constant"
import { Category } from "./categories"

export type StockCreateInputs = {
    id?: string
    sizes:{ 
        quantity: number;
        size: string;
    }[]
    color: string;
    description: string;
    imageIds: string[]
}
export type StockInputs = {
    id?: string
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
export interface StockItem {
  stockId: string;
  color: string;
  quantity: number;
  goodId: string;
  title: string;
  description: string;
  price: number;
  imageIds: string[];
  stocks: 
                {
                    stockId: string
                    size: string}[]
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

export interface GoodsWithStocks {
  id: string;
  title: string;
  description: string;
  stocks: StockGroup[];
  price: number
}

export interface StockGroup {
  color: string | null; // because s.color can be null
  details: StockDetails[];
  imageIds: string[]
}

export interface StockDetails {
  stockId: string;
  size: string;       // or enum Size if you want
  quantity: number;
  color: string | null;
}
export const useProductStocks = () =>{
    const api = useApi()

    const fetchProductStocks = useCallback((id: string)=>{
        return api<GoodsWithStocks>(`/goods/stocks/${id}`,'GET')
    },[api])
    
    return {
        fetchProductStocks
    }
}


export const useStockItemsCallBack = () => {
    const [data,setData] = useState<PaginatedResponse<StockItem>>()
    const api = useApi()


const [paginationOption, setPaginationOption] = useState(PAGINATION_INIT_OPTIONS)

const fetchProductsCallback = useCallback(()=>{
        return api<PaginatedResponse<StockItem>>('/goods/stock-list','GET',{
          config: {
            params: paginationOption
          }
        }).then((response)=>setData(response))
    },[paginationOption])
    

    useEffect(()=>{
        fetchProductsCallback()
    },[fetchProductsCallback])

    return {
        data,
        fetchProductsCallback,
        paginationOption,
        setPaginationOption
    }
}