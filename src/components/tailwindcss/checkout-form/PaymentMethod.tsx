'use client';
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type PaymentOption = {
  value: string;
  name: string;
  charge?: number; // optional charge
};

export default function PaymentMethod() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [payments, setPayments] = useState<PaymentOption[]>([]);

  useEffect(() => {
    // Dummy API example
    setTimeout(() => {
      setPayments([
        { value: "cod", name: "Cash On Delivery", charge: 50 },
        { value: "online", name: "Online Payment" }, // no extra charge
      ]);
    }, 300);
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Payment Method
      </label>

      <Controller
        name="paymentMethod"
        control={control}
        defaultValue="cod"
        rules={{
          required: "Payment Method is required",
        }}
        render={({ field }) => (
          <div className="flex gap-4 flex-wrap">
            {payments.map((payment) => {
              const isSelected = field.value === payment.value;
              return (
                <div
                  key={payment.value}
                  className={`flex-1 min-w-[150px] cursor-pointer rounded-lg border px-4 py-3 transition-all
                    ${isSelected ? "border-indigo-600 bg-indigo-50" : "border-gray-300 bg-white"}
                    hover:border-indigo-400`}
                  onClick={() => field.onChange(payment.value)}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={payment.value}
                      checked={isSelected}
                      onChange={() => field.onChange(payment.value)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="font-medium text-gray-900">{payment.name}</span>
                  </div>
                  {payment.charge && payment.charge > 0 && (
                    <p className="text-sm text-gray-500 mt-1">Charge: ${payment.charge}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      />

      {errors["paymentMethod"] && (
        <p className="text-sm text-red-600">{errors["paymentMethod"]?.message?.toString()}</p>
      )}
    </div>
  );
}
