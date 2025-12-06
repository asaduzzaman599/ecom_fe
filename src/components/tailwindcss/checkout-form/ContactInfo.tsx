import PhoneNumberInput from "@/components/fields/PhoneNumberInput";
import { useFormContext } from "react-hook-form";

export default function ContactInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>

      {/* Name */}
      <div>
        <label className="block text-sm/6 font-medium text-gray-700">Full Name</label>
        <input
         className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder="Your full name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm/6 font-medium text-gray-700">Email</label>
        <input
          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder="example@mail.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <PhoneNumberInput name="phone" />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>
    </div>
  );
}
