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
import { PlusCircleIcon } from '@heroicons/react/20/solid'


type Props = {
  selectedId?: string
  reload: () => void
}
export default function ProductCreateDialog({ selectedId, reload }: Props) {
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
      reset
    } = useForm<ProductInputs>();
     const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "stocks", // unique name for your Field Array
  });
    const [types, setTypes] = useState<SelectOptions>([]) 
    const [categories, setCategories] = useState<SelectOptions>([]) 

    useEffect(()=>{
      if(open){
       fetchAllType().then(data=>setTypes(data.map(({id, title})=>({value: id, name:  title }))))
       fetchAllCategory().then(data=>setCategories(data.map(({id, title})=>({value: id, name:  title }))))
      if(selectedId) {
        fetchProduct(selectedId).then(data=>{
        setValue('title', data.title)
        setValue('typeId', data.type.id)
  })}}
    },[open])

    
  const onSubmit: SubmitHandler<ProductInputs> = async (data) => {
    try{
      const inputData = {
        'title': data.title,
        'typeId': data.typeId
      }
      // if(!selectedId)
      //   await api('/products','POST', {data: inputData})
      // else
      //   await api(`/products/${selectedId}`,'PATCH', {data: inputData})

      reload()
      toast.success(`${selectedId ? 'Updated' : 'Created'} successfully!`)
      console.log({data})
      //   setTimeout(()=>{
    //   reset()
    //   setOpen(false)
    // },1000)
    }catch(err){
      console.log(err)
    }
  }

  return (<SimpleDialog activator={() => (!selectedId ? <button
    onClick={() => setOpen(true)}
    type="button"
    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Add Product
  </button>
  : <button 
    onClick={() => setOpen(true)}
     className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                          Edit
                        </button>)}
    open={open}
    setOpen={setOpen}
    title='Create Admin'
  >
     <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                
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
                <FileUpload />
                </div>
                
                <div className="mt-2">
                  <input
                    id="title"
                   {...register("title", { required: true })}
                    placeholder="Enter Title"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
               
              </div>
              <div className="mt-2">
                <div className="flex justify-between ">
                  <span  className="text-base font-semibold text-gray-900">Stock</span>
                  <button onClick={()=>append({color: '#fff', size: 'NONE', quantity: 0, description: ''})}
                      className="block rounded-md  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >  <PlusCircleIcon aria-hidden="true" className="size-5 text-gray-500" /></button>
                </div>
              {
                fields.map((field, idx)=><ProductStockCreateUpdateCard key={idx} control={control} register={register} index={idx} />)
              }
              </div>
                          
    
    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
      >
        {selectedId ? 'Update' : 'Create' }
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      >
        Cancel
      </button>
    </div>
    
            </form>
  </SimpleDialog>)
}