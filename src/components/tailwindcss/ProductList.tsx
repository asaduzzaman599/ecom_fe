'use client';
import { StockItem } from "@/composable/products"
import FilePreview from "../FilePreview"

import { useRouter } from 'next/navigation'


type Props = {
  items?: StockItem[]
} 
export default function ProductList({ items }:Props) {
  const router = useRouter()
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {items?.map((product, idx) => (
            <div key={idx} onClick={()=>router.push(`/products/${product.goodId}/${product.stocks[0].stockId}`)}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <FilePreview fileId={product.imageIds?.[0]} className="size-full object-cover" />
                </div>
                <div className="relative mt-4 flex items-start justify-between">
  <div className="flex-1">
    <h3 className="text-md font-semibold text-gray-900">{product.title}</h3>
    <p className="mt-1 text-xs text-gray-500">{product.description.length > 30 ? `${product.description.slice(0,30)}...`: product.description}</p>
  </div>

  <div
    className="w-6 h-6 rounded-full shadow shrink-0 ml-3"
    style={{ backgroundColor: product.color }}
  />
</div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.price}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Add to bag<span className="sr-only">, {product.name}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
