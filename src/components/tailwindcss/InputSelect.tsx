'use client'

import { ChevronDownIcon } from '@heroicons/react/16/solid'

export type SelectOption = { id: string | number ; name: string }
export type SelectOptions = SelectOption[]
type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {items: SelectOptions}
export default function InputSelect({items, ...props}: Props) {
 

  return (
    <>
      <div className="grid grid-cols-1">
        <select
          {...props}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
        >
          {items?.map(({id, name})=><option value={id} key={id}>{name}</option>)}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </div>
    </>
  )
}
