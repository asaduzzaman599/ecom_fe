'use client'
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ProductInputs } from "@/composable/products";
import ColorInput from "../fields/ColorInput";
import SizeInput from "../fields/SizeInput";
import SimpleDialog from "../tailwindcss/Dialog";
import { useState } from "react";
import { FileUpload } from "../tailwindcss/FileUpload";

type Props = {
    register:  UseFormRegister<ProductInputs>
    control: Control<ProductInputs>
    index: number
    setValue: UseFormSetValue<ProductInputs>
}

export default function StockCreateUpdateCard({ register, control, index, setValue }: Props){
  
  const [open, setOpen] = useState(true)
    
    return (<SimpleDialog activator={() => (<button
    onClick={() => setOpen(true)}
    type="button"
    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Add Product
  </button>
  )}
    open={open}
    setOpen={setOpen}
    title='Add Stock'
    footer={
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
      >
        {'Create' }
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      >
        Cancel
      </button>
    </div>
    }
  >
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       {new Array(4).fill(null).map((_, idx)=><FileUpload key={idx} setAttachmentId={(id: string)=>{
        console.log("set attachment")
        setValue(`stocks.${index}.imageIds.${idx}`, id)
       }} />)}
       
    </div>
    <div className="grid grid-cols-2 gap-2 p-4 mt-2">
        <div className="mt-2">
                          <SizeInput register={register} name={`stocks.${index}.size`}/>
                        </div>
        <div className="mt-2">
                          <input
                            id={`stocks.${index}.quantity`}
                            min={0}
                           {...register(`stocks.${index}.quantity`, { required: true, valueAsNumber: true })}
                            placeholder="Enter Quantity"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
        <div className="mt-2">
                          <input
                            id={`stocks.${index}.description`}
                           {...register(`stocks.${index}.description`, { required: true })}
                            placeholder="Enter Description"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
        <div className="mt-2">
                          <ColorInput control={control} name={`stocks.${index}.color`} />
                        </div>
    </div>
   </SimpleDialog>)
}