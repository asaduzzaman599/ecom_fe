'use client'

import { useEffect, useState } from "react";
import SimpleDialog from "../tailwindcss/Dialog";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAPi from "@/composable/api";
import { ProductInputs, StockInputs, useProduct } from "@/composable/products";
import InputSelect, { SelectOptions } from "../tailwindcss/InputSelect";
import { useAllType } from "@/composable/types";
import { useAllCategory } from "@/composable/categories";
import { FileUpload } from "../tailwindcss/FileUpload";
import ProductStockCreateUpdateCard from "./ProductStockCreateUpdateCard";
import ProductStockPreview from "./ProductStock";



type Props = {
  selectedId?: string
  reload?: () => void
}
export default function ProductCreateUpdateForm({ selectedId, reload }: Props) {
  const [open, setOpen] = useState(false)
  const { fetchProduct } = useProduct()
  const {fetchAllType} = useAllType()
  const {fetchAllCategory} = useAllCategory()
  const api = useAPi()
  const {
      control,
      register,
      handleSubmit,
      watch,
      formState: { errors },
      setValue,
      getValues,
      reset
    } = useForm<ProductInputs>();
     const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "stocks", // unique name for your Field Array
  });
    const [types, setTypes] = useState<SelectOptions>([]) 
    const [categories, setCategories] = useState<SelectOptions>([]) 

    useEffect(()=>{
       fetchAllType().then(data=>setTypes(data.map(({id, title})=>({value: id, name:  title }))))
       fetchAllCategory().then(data=>setCategories(data.map(({id, title})=>({value: id, name:  title }))))
      if(selectedId) {
        fetchProduct(selectedId).then(data=>{
        setValue('title', data.title)
        setValue('typeId', data.type.id)
  })}
    },[])

    
  const onSubmit: SubmitHandler<ProductInputs> = async (data) => {
    try{
      console.log(data)
      const inputData = {
        'title': data.title,
        'typeId': data.typeId
      }
      await api('goods', 'POST', {data: {...data, price: +data.price}})
    
      toast.success(`${selectedId ? 'Updated' : 'Created'} successfully!`)

  
    }catch(err){
      console.log(err)
    }
  }

  return (<div 
  >
     <form onSubmit={handleSubmit(onSubmit)} >
              <div className="grid md:grid-cols-2 gap-5 bg-white p-5 rounded shadow">
                <div className="mt-2">
                  <InputSelect
                    id="type"
                   {...register("typeId", { required: true })}
                    placeholder="Enter Type"
                    items={types}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
               
                <div className="mt-2">
                  <InputSelect
                    id="type"
                   {...register("categoryId", { required: true })}
                    placeholder="Enter Category"
                    items={categories}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              
                
                <div className="mt-2">
                  <input
                    id="title"
                   {...register("title", { required: true })}
                    placeholder="Enter Title"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <div className="mt-2">
                  <input
                    id="description"
                   {...register("description", { required: true })}
                    placeholder="Enter Description"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                
                <div className="mt-2">
                  <input
                    id="price"
                   {...register("price", { required: true, valueAsNumber: true })}
                    placeholder="Enter Price"
                    type="number"
                    min={1}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
               
              </div>
              <div className="mt-4">
                <div className="flex justify-between ">
                  <span  className="text-base font-semibold text-gray-900">Stock</span>
                 <ProductStockCreateUpdateCard control={control} register={register} append={append} setValue={setValue} open={open} setOpen={setOpen}/>
                  
                </div>
              <div className=" ">
              {
                <ProductStockPreview<StockInputs> items={getValues('stocks')} remove={remove} />
              }
              </div>
             <div className="w-full flex justify-end gap-2 mt-4">
              <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
      >
        {'Create' }
      </button>
      <button
        type="button"
        onClick={() => {}}
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      >
        Cancel
      </button>
             </div>
              </div>
            </form>
  </div>)
}