import Pagination from "@/components/tailwindcss/Pagination"

type PaginationOption = {
  page: number
  limit: number
}

export type PaginatedResponse<T>  = {
  hasNext: boolean
  hasPrevious: boolean
  totalPage: number
  count: number
  items: T[]
} & PaginationOption

export type PaginationProps <T> = {
  response?: PaginatedResponse<T>
  paginationOption: PaginationOption
  setPaginationOption: React.Dispatch<React.SetStateAction<PaginationOption>>
}

export const usePagination = <T>() => (props: PaginationProps<T>)=>Pagination(props)