'use client'

import { StockGroup } from "@/composable/products"

type Props = {
  stocks?: StockGroup[]
  selectedStockId?: string
  onColorChange: (id: string) => void
}
export default function ProductColors({ stocks = [], onColorChange, selectedStockId}: Props) {
  
  return (
    <>
    {/* Product info */}
          <div>
                <h3 className="text-sm font-medium text-gray-600">Color</h3>
{selectedStockId}
                <fieldset aria-label="Choose a color" className="mt-2">
                  <div className="flex items-center gap-x-3">
                    {stocks?.map((s) => (
                      <div key={s.color} className="flex rounded-full outline -outline-offset-1 outline-black/10">
                        <input
                          defaultValue={s.details[0].stockId}
                          defaultChecked={s.stockIds?.includes(selectedStockId as string)}
                          name="color"
                          type="radio"
                           style={{ backgroundColor: s?.color, outlineColor: s.color  }} 
                           onChange={()=>onColorChange(s.details[0].stockId)}
                          className={
                            
                            `checked:outline-2 checked:outline size-8 appearance-none rounded-full forced-color-adjust-none checked:outline checked:outline-2 checked:outline-offset-2 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px]`}
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
    </>
  )
}
