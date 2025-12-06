import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import AddressSection from "./AddressSection";
import DeliveryMethod from "./DeliveryMethod";
import PaymentMethod from "./PaymentMethod";
import NoteSection from "./OrderNote";
import ContactInfo from "./ContactInfo";
import useApi from "@/composable/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";



export default function CheckoutInfo() {
    const cart = useSelector((state: RootState)=>state.cart)
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      deliveryMethod: "",
      paymentMethod: "",
      note: ""
    },
  });

  const { handleSubmit } = methods;
  const api = useApi()
    const mapFormToOrderDto = (formData, cartDetails, customerId: string) => {
  return {
    customerId,
    remarks: formData.note,
    orderItems: cartDetails.items.map(item => ({
      stockId: item.stock.id,
      quantity: item.qty, // or item.quantity
      price: item.stock.good.price,
    })),
    deliveryInfo: {
      address: formData.address,
      phone: formData.phone,
    },
    paymentInfo: {
      paymentMethodId: formData.paymentMethod,
      deliveryMethodId: formData.deliveryMethod,
      additionalCharge: cartDetails.additionalCharge ?? 0,
    }
  };
};
  const onSubmit = async (data) => {
    try {
      const dto = mapFormToOrderDto(data, cart.details, "customer-id-123"); // replace with real customerId
      const response = await api("/orders",'POST', {data: dto});
      console.log("Order created:", response.data);
      alert("Order created successfully!");
    } catch (err) {
      console.error("Order submission error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <FormProvider {...methods}>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

    <ContactInfo />     {/* 👈 Now grouped */}

    <AddressSection />
    <DeliveryMethod />
    <PaymentMethod />
    <NoteSection />

    <button type="submit">Submit</button>
  </form>
</FormProvider>

  );
}
