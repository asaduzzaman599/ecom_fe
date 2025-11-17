import { StockGroup } from '@/composable/products'
import {
      Tab,
      TabGroup,
      TabList,
      TabPanel,
      TabPanels,
    } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import useApi from '@/composable/api'

    type Props = {stock?: StockGroup}
 function ProductDetailsImage({stock}: Props){
    const [files, setFiles] = useState<File[]>([])
    const api = useApi()

    useEffect( ()=>{
        if(stock?.imageIds.length)
        Promise.all(stock?.imageIds?.map(i=>api<File>(`/attachments/file/${i}`,'GET',{config: {
            responseType: 'blob'
        }}))).then((resolve)=>{
            setFiles(resolve)
        })
    },[stock, api])

    function imageSrc(img: File){
      return URL.createObjectURL(img)
    }
    return (<>
    <TabGroup className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {files.map((image,idx) => (
                  <Tab
                    key={idx}
                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4"
                  >
                    <span className="sr-only">{image.name}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img alt="" src={imageSrc(image)} loading="lazy" className="size-full object-cover" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                    />
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels>
              {files.map((image,idx) => (
                <TabPanel key={idx}>
                  <img alt={''} src={imageSrc(image)} loading="lazy" className="aspect-square w-full object-cover sm:rounded-lg" />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
    </>)
}

export default React.memo(ProductDetailsImage)