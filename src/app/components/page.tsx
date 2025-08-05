
import CategoryPreviews from "@/components/tailwindcss/CategoryPreviews";
import Footer from "@/components/tailwindcss/Footer";
import Incentives from "@/components/tailwindcss/Incentives";
import ProductFeatures from "@/components/tailwindcss/ProductFeatures";
import ProductPreview from "@/components/tailwindcss/ProductPreview";
import PromoSection from "@/components/tailwindcss/PromoSection";
import StoreNavigation from "@/components/tailwindcss/StoreNavigation";

export default function ComponentPage() {
    return (
        <>
        <StoreNavigation />
        <PromoSection />
        <CategoryPreviews />
        <ProductPreview />
        <Incentives />
        <ProductFeatures />
        <Footer />
        </>
    )
}