'use client'

import FilePreview from "@/components/FilePreview"
import { StockItem, useStock } from "@/composable/cart"
import { useEffect, useState } from "react"

type Props = {
  stockItem: {quantity: number; stockId: string}
}
export function ShoppingCartItem({ stockItem }: Props){
    const {fetchStock} = useStock()
    const [stock, setStock] = useState<StockItem>()
    useEffect(()=>{
        if(stockItem?.stockId)
        fetchStock(stockItem.stockId).then(data=>setStock(data))
    },[stockItem?.stockId])
    return (<li  className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <FilePreview fileId={stock?.imageIds?.[0]} className="size-full object-cover" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      {/* <Link href={`/products/${stock?.goodId}/${stock?.id}`}>{stock?.good?.title}</a> */}
                                    </h3>
                                    <p className="ml-4"><span className="font-semibold">BDT</span> {stock?.good?.price}</p>
                                  </div>
                                  <p
                           style={{ backgroundColor: stock?.color  }} 
                          
                          className={
                            
                            `checked:outline-2 checked:outline size-8 appearance-none shadow-lg rounded-full forced-color-adjust-none checked:outline checked:outline-2 checked:outline-offset-2 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px]`}
                        />
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {stockItem.quantity}</p>

                                  <div className="flex">
                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>)
}