'use client'
import { Control, useFieldArray, useForm } from "react-hook-form";
import { StockCreateInputs, StockInputs } from "@/composable/products";
import ColorInput from "../fields/ColorInput";
import SizeInput from "../fields/SizeInput";
import SimpleDialog from "../tailwindcss/Dialog";
import { FileUpload } from "../tailwindcss/FileUpload";
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/20/solid'
import { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  append: (data: StockInputs) => void
}

export default function StockCreateUpdateCard({ open, setOpen, append }: Props) {

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<StockCreateInputs>({
    defaultValues: {
      color: '#fff',
      description: '',
      imageIds: ['', '', '', ''],
      sizes: [{ size: 'NONE', quantity: 1 }]
    }
  });

  const { fields, append: addSize, remove } = useFieldArray({
    control,
    name: "sizes"
  });

  function onSubmit(data: StockCreateInputs) {
    const uploaded = data.imageIds.filter(id => id !== "");
    if (uploaded.length !== 4) return toast.error('4 Images required!');

    if (!data.sizes.length) return toast.error('Add at least one size!');

    data.sizes.forEach(i=>{
      append({...i, color: data.color, description: data.description, imageIds: data.imageIds});
    })
    reset();
    setOpen(false);
  }

  return (
    <SimpleDialog
      activator={() => (
        <button onClick={() => setOpen(true)}
          type="button"
          className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white cursor-pointer"
        >
          <PlusCircleIcon aria-hidden="true" className="size-5 text-gray-500" />
        </button>
      )}
      open={open}
      setOpen={setOpen}
      title='Add Stock'
      disabledBreakDropClose
      footer={
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            form="stockForm"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 sm:ml-3 sm:w-auto"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      }
    >

      {/* FORM */}
      <form id="stockForm" onSubmit={handleSubmit(onSubmit)}>

        {/* IMAGES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {getValues('imageIds').map((_, idx) => (
            <FileUpload
              key={idx}
              setAttachmentId={(id: string) => setValue(`imageIds.${idx}`, id)}
              required
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 p-4 mt-4">

          {/* DESCRIPTION */}
          <div className="mt-2 col-span-2">
            <input
              {...register("description", { required: "Description is required" })}
              placeholder="Enter Description"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          {/* COLOR */}
          <div className="mt-2 col-span-2">
            <ColorInput control={control} name="color" />
            {errors.color && <p className="text-sm text-red-500">{errors.color.message}</p>}
          </div>

          {/* SIZES */}
          <div className="col-span-2 mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-sm">Sizes & Quantity</label>
              <button
                type="button"
                onClick={() => addSize({ size: 'NONE', quantity: 1 })}
                className="flex items-center text-indigo-600 text-sm"
              >
                <PlusCircleIcon className="w-4 h-4 mr-1" /> Add Size
              </button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mb-2">
                <SizeInput register={register} name={`sizes.${index}.size`} />

                <input
                  type="number"
                  min={1}
                  {...register(`sizes.${index}.quantity`, {
                    required: true,
                    valueAsNumber: true,
                    min: { value: 1, message: "Min 1" }
                  })}
                  placeholder="Qty"
                  className="w-20 rounded-md bg-white px-2 py-1 text-sm outline outline-1 outline-gray-300 focus:outline-indigo-600"
                />

                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)}>
                    <MinusCircleIcon className="w-5 h-5 text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </SimpleDialog>
  )
}
