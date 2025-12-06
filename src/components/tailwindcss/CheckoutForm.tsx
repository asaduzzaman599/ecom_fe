'use client'

import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { useCartAction } from '@/store/cart/cartActions'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useEffect } from 'react'
import FilePreview from '../FilePreview'
import CheckoutInfo from './checkout-form/CheckoutInfo'


export default function CheckoutForm() {
  const cart = useSelector((state: RootState)=>state.cart)
  const {fetchCartDetails} = useCartAction()

  useEffect(()=>{
    fetchCartDetails()
  },[])
  console.log(cart.details?.items)
  return (
    <div className="">
      {/* Background color split screen for large screens */}
      <div aria-hidden="true" className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" />
      <div aria-hidden="true" className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 lg:block" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
              {cart.details?.items?.map((product) => (
                <li key={product.stock.id} className="flex items-start space-x-4 py-6">
                  <FilePreview
                    fileId={product.stock.imageIds?.[0]}
                    className="size-20 flex-none rounded-md object-cover"
                  />
                  <div className="flex-auto space-y-1">
                    <h3>{product.stock.good.title}</h3>
                     <div
    className="w-6 h-6 rounded-full shadow shrink-0"
    style={{ backgroundColor: product.stock.color }}
  />
                    <p className="text-gray-500">{product.stock.size}</p>
                  </div>
                  <p className="flex-none text-base font-medium"><span className='font-semibold'>BDT</span> {product.stock.good.price}</p>
                </li>
              ))}
            </ul>

            <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd><span className='font-semibold'>BDT </span>{ cart.details?.total ?? 0}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd><span className='font-semibold'>BDT </span>15.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Taxes</dt>
                <dd><span className='font-semibold'>BDT</span> 26.80</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base"><span className='font-semibold'>BDT</span> 361.80</dd>
              </div>
            </dl>

            <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
              <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                <div className="mx-auto max-w-lg">
                  <PopoverButton className="flex w-full items-center py-6 font-medium">
                    <span className="mr-auto text-base">Total</span>
                    <span className="mr-2 text-base">$361.80</span>
                    <ChevronUpIcon aria-hidden="true" className="size-5 text-gray-500" />
                  </PopoverButton>
                </div>
              </div>

              <PopoverBackdrop
                transition
                className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
              />
              <PopoverPanel
                transition
                className="relative transform bg-white px-4 py-6 transition duration-300 ease-in-out data-[closed]:translate-y-full sm:px-6"
              >
                <dl className="mx-auto max-w-lg space-y-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd>$320.00</dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd>$15.00</dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Taxes</dt>
                    <dd>$26.80</dd>
                  </div>
                </dl>
              </PopoverPanel>
            </Popover>
          </div>
        </section>

        <CheckoutInfo />
      </div>
    </div>
  )
}
