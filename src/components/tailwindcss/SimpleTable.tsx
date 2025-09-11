'use client'


interface DataTableHeaderType {
        title: string
        key: string
    }
    type ItemType<T> = T & {
        id: string | number
    }

interface Props<T> {
    headers: DataTableHeaderType[]
    items?: T[]
    PaginationElement?: ()=> React.ReactNode
    action?: (item: T)=> React.ReactNode
}
export default function SimpleTable<T>({headers, items, PaginationElement, action }: Props<T>) {
  return (
    
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg">
              <table className="relative min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {
                        headers.map((header)=>(<th key={header.key} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      {header.title}
                    </th>))
                    }
                    
                    <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                  items?.map((item: any,idx: number) => (
                    <tr key={idx}>
                      {
                        headers.map(({key})=>(<td key={key} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item[key]}
                      </td>))
                      }
                     
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {action && action(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {
                PaginationElement && PaginationElement()
            }
          </div>
        </div>
  )
}
