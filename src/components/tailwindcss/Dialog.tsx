'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    activator?: ()=> React.ReactNode
    children?: React.ReactNode
    footer?: React.ReactNode
    title: string
    disabledBreakDropClose?: boolean
}
export default function SimpleDialog({ open, setOpen, children, activator, title, footer, disabledBreakDropClose }:Props) {

  function handleClose(){
    if(!disabledBreakDropClose){
      setOpen(false)
    }
  }
  return (
    <div>
          {activator && activator()}
      <Dialog open={open} onClose={handleClose} className="relative z-60">
        <DialogBackdrop
        
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed h-full inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="h-10/12 flex flex-col relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg md:w-2xl md:max-w-2xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div> */}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    {title}
                  </DialogTitle>
                  
                </div>
              </div>
              <hr className='mt-4' />
             <div className='h-full overflow-auto'>
               {children}
             </div>
                {
                footer ?
              <>
                   <hr className='mb-4' />
                   {
                    footer
                   }
              </>:
              null
                }
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
