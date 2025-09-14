import { useEffect, useState } from "react";
import SimpleDialog from "../tailwindcss/Dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAPi from "@/composable/api";
import { useCategory } from "@/composable/categories";
import InputSelect, { SelectOptions } from "../tailwindcss/InputSelect";
import { useAllType } from "@/composable/types";

type Inputs = {
  title: string;
  typeId: string;
}

type Props = {
  selectedId?: string
  reload: () => void
}
export default function CategoryCreateDialog({ selectedId, reload }: Props) {
  const [open, setOpen] = useState(false)
  const { fetchCategory } = useCategory()
  const {fetchAllType} = useAllType()
  const api = useAPi()
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      setValue,
      reset
    } = useForm<Inputs>();
    const [types, setTypes] = useState<SelectOptions>([]) 

    useEffect(()=>{
      if(open){
       fetchAllType().then(data=>setTypes(data.map(({id, title})=>({id, name:  title }))))
      if(selectedId) {
        fetchCategory(selectedId).then(data=>{
        setValue('title', data.title)
        setValue('typeId', data.type.id)
  })}}
    },[open])

    
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try{
      const inputData = {
        'title': data.title,
        'typeId': data.typeId
      }
      if(!selectedId)
        await api('/categories','POST', {data: inputData})
      else
        await api(`/categories/${selectedId}`,'PATCH', {data: inputData})

      reload()
      toast.success(`${selectedId ? 'Updated' : 'Created'} successfully!`)
      setTimeout(()=>{
      reset()
      setOpen(false)
    },1000)
    }catch(err){
      console.log(err)
    }
  }

  return (<SimpleDialog activator={() => (!selectedId ? <button
    onClick={() => setOpen(true)}
    type="button"
    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Add Category
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
                    items={types}
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