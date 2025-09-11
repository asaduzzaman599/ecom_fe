import { PaginationProps } from "@/composable/pagination"
import React from "react"

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]


export default function Pagination<T>(props: PaginationProps<T>) {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(props.paginationOption.limit * props.paginationOption.page) - (props.paginationOption.limit-1) }</span> to <span className="font-medium">{(props.paginationOption.limit * props.paginationOption.page)}</span> of{' '}
          <span className="font-medium">{props?.response?.count}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={()=>props.setPaginationOption({...props.paginationOption, page: props.paginationOption.page - 1})}
          disabled={!props?.response?.hasPrevious}
          className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${!props?.response?.hasPrevious ? 'cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <button
          onClick={()=>props.setPaginationOption({...props.paginationOption, page: props.paginationOption.page + 1})}
          disabled={!props?.response?.hasNext}
          className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${!props?.response?.hasNext ? 'cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </nav>
  )
}
