import { Dispatch, SetStateAction, useState } from "react";
import SimpleDialog from "../tailwindcss/Dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAPi from "@/composable/api";

type Inputs = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

type Props = {}
export default function UserCreateDialog({ }: Props) {
  const [open, setOpen] = useState(false)
  const api = useAPi()
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      reset
    } = useForm<Inputs>();

    
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try{
      const inputData = {
        'firstName': data.firstName,
        'lastName': '',
        'email': data.email,
        'password': data.phone,
        'phone': data.phone,
        'role': "Admin"
      }
      await api('/auth/register-admin','POST', {data: inputData})
      toast.success('Signup successfully!')
      setTimeout(()=>{
      reset()
      setOpen(false)
    },1000)
    }catch(err){
      console.log(err)
    }
  }

  return (<SimpleDialog activator={() => (<button
    onClick={() => setOpen(true)}
    type="button"
    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Add user
  </button>)}
    open={open}
    setOpen={setOpen}
    title='Create Admin'
  >
     <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                
                <div className="mt-2">
                  <input
                    id="name"
                   {...register("firstName", { required: true })}
                    placeholder="Enter Name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              
              <div>
               
                <div className="mt-2">
                  <input
                    id="phone"
                        {...register("phone", { required: true })}
                    placeholder="Enter Phone Number"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    id="email"
                        {...register("email", { required: true })}
                    autoComplete="email"
                    placeholder="Enter Email Address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              
    
    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
      >
        Create
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      >
        Cancel
      </button>
    </div>
    
            </form>
  </SimpleDialog>)
}