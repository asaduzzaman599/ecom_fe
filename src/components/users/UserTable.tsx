'use client'
import { useEffect, useState } from "react";
import SimpleDialog from "../tailwindcss/Dialog";
import Pagination from "../tailwindcss/Pagination";
import SimpleTable from "../tailwindcss/SimpleTable";
import UserCreateDialog from "./UserCreateDialog";
import useApi from "@/composable/api";
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
  { name: 'Tom Cook', title: 'Director of Product', email: 'tom.cook@example.com', role: 'Member' },
  { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
  { name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
  { name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' },
]
export default function UserTable(){
    const [items,setItems] = useState([])
    const api = useApi()
const headers = [
    {title: 'Name', key: 'firstName' },
    {title: 'Phone', key: 'phone' },
    {title: 'Email', key: 'email' },
    {title: 'Roles', key: 'role' },
]
    useEffect(()=>{
        api('/users','GET').then((data)=>setItems(data))
    },[])
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
            <UserCreateDialog />
        </div>
      </div>
      <div className="mt-8">
        <SimpleTable headers={headers} items={items} PaginationElement={Pagination} />
        </div></div>
    
    )
}