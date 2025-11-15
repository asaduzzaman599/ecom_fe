'use client'
import useApi from "@/composable/api";
import { useEffect, useState } from "react";
import ProductList from "../tailwindcss/ProductList";
import { useStockItemsCallBack } from "@/composable/products";

export default function ProductsView(){
    const {data} = useStockItemsCallBack()

    return (<>
    <ProductList items={data?.items} />
    </>)
}