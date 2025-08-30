'use client'

import { useAuth } from '@/composable/auth'
import { RootState } from '@/store/store'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSelector } from 'react-redux'


export default function DropdownMenu() {
    const {signOut} = useAuth()
    const auth = useSelector((state: RootState)=>state.auth)
  return ( <Menu as="div" className="relative inline-block">
      <MenuButton className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span className="sr-only">Open options</span>
        <UserIcon aria-hidden="true" className="size-5" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline outline-1 outline-black/5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {
            auth.user && ['admin', 'superadmin'].includes(auth.user?.role?.toLowerCase())?
            <MenuItem>
            <Link
              href="/dashboard"
              className="text-start block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Dashboard
            </Link>
          </MenuItem>
          : null
          }
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              License
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                onClick={signOut}
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  )
}
