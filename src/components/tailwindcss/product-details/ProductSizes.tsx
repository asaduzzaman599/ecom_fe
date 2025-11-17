'use client'

import { StockGroup } from "@/composable/products"

type Props = {
  selected?: string
  stock?: StockGroup
  onChange: (id: string)=>void
}
export default function ProductSizes({ stock, selected, onChange }: Props) {
  return (
   <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      See sizing chart
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-2">
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {stock?.details?.map(({size, stockId, quantity}) => (
                        <label
                          key={stockId}
                          aria-label={size}
                          className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-[:checked]:border-indigo-600 has-[:disabled]:border-gray-400 has-[:checked]:bg-indigo-600 has-[:disabled]:bg-gray-200 has-[:disabled]:opacity-25 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo-600"
                        >
                          <input
                            defaultValue={stockId}
                            defaultChecked={stockId === selected}
                            name="size"
                            type="radio" 
                            onChange={() => onChange(stockId)}
                            disabled={!quantity}
                            className="absolute inset-0 appearance-none focus:outline focus:outline-0 disabled:cursor-not-allowed"
                          />
                          <span className="text-sm font-medium uppercase group-has-[:checked]:text-white">
                            {size}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
  )
}
