'use client'

import { Category, useCategories } from "@/composable/categories";
import SimpleTable from "../tailwindcss/SimpleTable";
import CategoryCreateUpdateDialog from "./CategoryCreateUpdateDialog";
import { Type } from "@/composable/types";
import Pagination from "../tailwindcss/Pagination";

export default function CategoriesTable(){
    const {headers, data, paginationOption, setPaginationOption, fetchCategoriesCallback}= useCategories()
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
            <CategoryCreateUpdateDialog reload={fetchCategoriesCallback} />
        </div>
      </div>
      <div className="mt-8">
        <SimpleTable<Category>
         headers={headers}
         items={data?.items}
        PaginationElement={<Pagination paginationOption={paginationOption} response={data} setPaginationOption={setPaginationOption}  />}
                 
         action={(item: Type)=><CategoryCreateUpdateDialog selectedId={item.id} reload={fetchCategoriesCallback} />} />
        </div></div>
    
    )
}