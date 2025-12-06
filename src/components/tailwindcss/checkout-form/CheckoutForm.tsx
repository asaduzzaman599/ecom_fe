import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import AddressSection from "./AddressSection";
import DeliveryMethod from "./DeliveryMethod";
import PaymentMethod from "./PaymentMethod";
import NoteSection from "./OrderNote";
import ContactInfo from "./ContactInfo";

export default function CheckoutForm() {
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

  const onSubmit = (data) => {
    console.log("Final Checkout Data:", data);
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
