'use client';
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type DeliveryOption = {
  value: string;
  name: string;
  charge?: number; // optional charge
};

export default function DeliveryMethod() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [deliverys, setDeliverys] = useState<DeliveryOption[]>([]);

  useEffect(() => {
    // Dummy API example
    setTimeout(() => {
      setDeliverys([
        { value: "dhaka", name: "Inside Dhaka", charge: 50 },
        { value: "outside-dhaka", name: "Outside Dhaka", charge: 100 },
      ]);
    }, 300);
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Delivery Method
      </label>

      <Controller
        name="deliveryMethod"
        control={control}
        defaultValue="cod"
        rules={{
          required: "Delivery Method is required",
        }}
        render={({ field }) => (
          <div className="flex gap-4 flex-wrap">
            {deliverys.map((delivery) => {
              const isSelected = field.value === delivery.value;
              return (
                <div
                  key={delivery.value}
                  className={`flex-1 min-w-[150px] cursor-pointer rounded-lg border px-4 py-3 transition-all
                    ${isSelected ? "border-indigo-600 bg-indigo-50" : "border-gray-300 bg-white"}
                    hover:border-indigo-400`}
                  onClick={() => field.onChange(delivery.value)}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={delivery.value}
                      checked={isSelected}
                      onChange={() => field.onChange(delivery.value)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="font-medium text-gray-900">{delivery.name}</span>
                  </div>
                  {delivery.charge && delivery.charge > 0 && (
                    <p className="text-sm text-gray-500 mt-1">BDT {delivery.charge}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      />

      {errors["deliveryMethod"] && (
        <p className="text-sm text-red-600">{errors["deliveryMethod"]?.message?.toString()}</p>
      )}
    </div>
  );
}
