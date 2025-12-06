import { useFormContext } from "react-hook-form";

export default function AddressSection() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-700">Address</label>
      <textarea
        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        placeholder="House, Road, Area"
        rows={3}
        {...register("address", { required: "Address is required" })}
      ></textarea>

      {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
    </div>
  );
}
