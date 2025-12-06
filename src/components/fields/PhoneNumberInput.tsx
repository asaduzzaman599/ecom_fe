"use client";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useFormContext, Controller } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  required?: boolean;
};

export default function PhoneNumberInput({
  name,
  label = "Phone Number",
  required = true,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "Phone number is required" : false,
          validate: (value) =>
            value?.length >= 10 || "Invalid phone number",
        }}
        render={({ field }) => (
          <PhoneInput
            {...field}
            defaultCountry="BD"
            international={false}
            countryCallingCodeEditable={false}
            placeholder="01XXXXXXXXX"
            className="phone-input block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        )}
      />

    </div>
  );
}
