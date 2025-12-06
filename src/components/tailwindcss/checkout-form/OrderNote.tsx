import { useFormContext } from "react-hook-form";

export default function OrderNote() {
  const { register } = useFormContext();

  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-700">Notes (optional)</label>
      <textarea
        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        placeholder="Any special instructions?"
        rows={2}
        {...register("note")}
      ></textarea>
    </div>
  );
}
