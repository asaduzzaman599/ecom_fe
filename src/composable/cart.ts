import { useCallback, useEffect } from "react"
import useApi from "./api"


export interface StockItem {
  id: string;
  size: string;
  color: string;
  description: string;
  quantity: number;
  damageQty: number;
  imageIds: string[];
  createdAt: string;      // ISO date string
  updatedAt: string;      // ISO date string
  deleted: boolean;
  isActive: boolean;
  goodId: string;
  good: Good;
}

export interface Good {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  price: number;
  isActive: boolean;
  typeId: string;
  categoryId: string;
  subCategoryId: string | null;
  createdAt: string;    // ISO date string
  updatedAt: string;    // ISO date string
  deleted: boolean;
}
export const useStock = () =>{
    const api = useApi()

    const fetchStock = useCallback((id: string)=>{
        return api<StockItem>(`/stocks/${id}`,'GET')
    },[api])
    
    return {
        fetchStock
    }
}