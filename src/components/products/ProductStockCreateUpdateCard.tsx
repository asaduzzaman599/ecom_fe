'use client'
import { Control, UseFormRegister } from "react-hook-form";
import { ProductInputs } from "@/composable/products";
import ColorInput from "../fields/ColorInput";
import SizeInput from "../fields/SizeInput";

type Props = {
    register:  UseFormRegister<ProductInputs>
    control: Control<ProductInputs>
    index: number
}

export default function StockCreateUpdateCard({ register, control, index }: Props){
    
    return (<>
    <div className="grid grid-cols-2 gap-2 p-4 shadow mt-2">
        <div className="mt-2">
                          <SizeInput register={register} name={`stocks.${index}.size`}/>
                        </div>
        <div className="mt-2">
                          <input
                            id={`stocks.${index}.quantity`}
                            min={0}
                           {...register(`stocks.${index}.quantity`, { required: true })}
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
    </>)
}