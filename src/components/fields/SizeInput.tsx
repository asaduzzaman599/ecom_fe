import { Control, FieldValues, Path, UseFormRegister } from "react-hook-form";
import InputSelect from "../tailwindcss/InputSelect";


type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>
};

export default function SizeInput<T extends FieldValues>({ register, name }: Props<T>) {
const sizeOptions = [{
        name: "2XL",
        value: '2XL'
    },{
        name: "XL",
        value: 'XL'
    },{
        name: "L",
        value: 'L'
    },{
        name: "M",
        value: 'M'
    },{
        name: "S",
        value: 'S'
    },{
        name: "None",
        value: 'NONE'
    }]

    return (<>
     <InputSelect
                                id={name}
                               {...register(name, { required: true })}
                                placeholder="Enter Size"
                                items={sizeOptions}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                              />
    </>)
}