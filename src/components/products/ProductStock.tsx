import useApi from "@/composable/api"
import Image from "next/image"
import { useEffect } from "react"
import FilePreview from "../FilePreview"
import { TrashIcon } from '@heroicons/react/20/solid'
import { UseFieldArrayRemove } from "react-hook-form"

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
  { name: 'Tom Cook', title: 'Director of Product', email: 'tom.cook@example.com', role: 'Member' },
  { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
  { name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
  { name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' },
]

type Props<T> = {
    tableController?: React.ReactNode
    items: T[]
    remove: UseFieldArrayRemove
}

export default function ProductStockPreview<T>({ tableController, items, remove }: Props<T>) {

  const api = useApi()

  useEffect(()=>{
    // getImage(item.imageIds[0])
  })


function getImage(id: string){
    return api(`/attachments/file/${id}`, 'GET',{config: {responseType: 'blob'}})
}
  return (
    <div className="px-4 sm:lg:px-8 bg-white shadow rounded-lg">
      {tableController &&<div className="sm:flex sm:items-center md:justify-end">
        
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          { tableController }
        </div>
      </div>}
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Image
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Size
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Color
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    quantity
                  </th>
                  <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              {<tbody className="divide-y divide-gray-200">
                {items?.map((item: T, idx) => (
                  <tr key={item.imageIds[0]}>
                    <td className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                <div className="flex items-center gap-x-4">
                  <FilePreview fileId={item.imageIds[0]} className="size-8 rounded-full 0" />
                </div>
              </td> 
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.description}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.size}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> <div style={{backgroundColor: item.color}} className="p-4 size-6 rounded-full shadow-lg"></div></td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.quantity}</td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button onClick={()=>remove(idx)}
                type="button"
                      className="block rounded-md  px-3 py-2 text-center text-sm font-semibold text-white cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >  <TrashIcon aria-hidden="true" className="size-5 text-red-500" /></button>
                    </td>
                  </tr>
                ))}
              </tbody> }
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
