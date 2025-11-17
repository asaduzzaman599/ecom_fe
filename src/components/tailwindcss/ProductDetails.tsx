'use client'
import { GoodsWithStocks, useProductStocks } from '@/composable/products'
import { HeartIcon } from '@heroicons/react/24/outline'

import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import ProductDetailsImage from './ProductDetailsImage'
import ProductColors from './product-details/ProductColors'
import { useCart } from '@/store/actions/cartActions'
import ProductSizes from './product-details/ProductSizes'
import ProductExtraDetails from './product-details/ProductExtraDetails'

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  

  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    {
      name: 'Care',
      items: [
        'Spot clean as needed',
        'Hand wash with mild soap',
        'Machine wash interior dividers',
        'Treat handle and tabs with leather conditioner',
      ],
    },
    {
      name: 'Shipping',
      items: [
        'Free shipping on orders over $300',
        'International shipping available',
        'Expedited shipping options',
        'Signature required upon delivery',
      ],
    },
    {
      name: 'Returns',
      items: [
        'Easy return requests',
        'Pre-paid shipping label included',
        '10% restocking fee for returns',
        '60 day return window',
      ],
    },
  ],
}

export default function ProductDetails() {
  const {ids} = useParams()
  const [productId] = useState(ids?.[0])
  const [stockId, setStockId] = useState(ids?.[1])
  const {fetchProductStocks} = useProductStocks()
  const [p, setProduct] = useState<GoodsWithStocks>()
  const {addItemToCart} = useCart()

  useEffect(()=>{
    if(productId)
    fetchProductStocks(productId).then(data=>{
      
      setProduct(data)})
  },[fetchProductStocks, productId])

  const currentStock = useMemo(()=>{
    if(!p || !stockId) return
    
    const exist = p.stocks.find(i=>i.stockIds.includes(stockId))
      if(exist) return exist
        if(!exist || !stockId){
          return p.stocks[0]
        }
  }, [p, stockId])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <ProductDetailsImage stock={currentStock} />
          
          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{p?.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">BDT {p?.price}</p>
            </div>

            {/* Reviews */}
            {/* <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                        'size-5 shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div> */}

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                dangerouslySetInnerHTML={{ __html: p?.description }}
                className="space-y-6 text-base text-gray-700"
              />
            </div>

            <form className="mt-6">
              {/* Colors */}
              <ProductColors stocks={p?.stocks} selectedStockId={stockId} onColorChange={(id)=>setStockId(id)} />

              <ProductSizes stock={currentStock} selected={stockId} onChange={(id)=>setStockId(id)} />

              <div className="mt-10 flex">
                <button
                  type="button"
                  onClick={()=>stockId && addItemToCart(stockId, 1)}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <ProductExtraDetails details={product.details} />
          </div>
        </div>
      </div>
    </div>
  )
}
