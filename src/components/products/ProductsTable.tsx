'use client'

import { Product, useProducts } from "@/composable/products";
import SimpleTable from "../tailwindcss/SimpleTable";
import ProductCreateUpdateDialog from "./ProductCreateUpdateDialog";
import { Type } from "@/composable/types";
import Pagination from "../tailwindcss/Pagination";

export default function ProductsTable(){
    const {headers, data, paginationOption, setPaginationOption, fetchProductsCallback}= useProducts()
    return (
        <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <ProductCreateUpdateDialog reload={fetchProductsCallback} />
        </div>
      </div>
      <div className="mt-8">
        <SimpleTable<Product>
         headers={headers}
         items={data?.items.map(i=>({...i, type: i.type.title }))}
        PaginationElement={<Pagination paginationOption={paginationOption} response={data} setPaginationOption={setPaginationOption}  />}
                 
         action={(item: Type)=><ProductCreateUpdateDialog selectedId={item.id} reload={fetchProductsCallback} />} />
        </div></div>
    
    )
}