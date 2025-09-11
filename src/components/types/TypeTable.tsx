'use client'

import { useEffect } from "react";
import Pagination from "../tailwindcss/Pagination";
import SimpleTable from "../tailwindcss/SimpleTable";
import TypeCreateUpdateDialog from "./TypeCreateUpdateDialog";
import { Type, useTypes } from "@/composable/types";

export default function TypesTable(){
    const {headers, data, paginationOption, setPaginationOption, fetchTypesCallback }= useTypes()

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
            <TypeCreateUpdateDialog reload={fetchTypesCallback} />
        </div>
      </div>
      <div className="mt-8">
        <SimpleTable<Type>
         headers={headers}
         items={data?.items}
         PaginationElement={<Pagination paginationOption={paginationOption} response={data} setPaginationOption={setPaginationOption}  />}
         action={(item: Type)=><TypeCreateUpdateDialog selectedId={item.id} reload={fetchTypesCallback} />} />
        </div></div>
    
    )
}