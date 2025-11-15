
import ProductsView from "@/components/products/StockItemsView";
import CategoryFilters from "@/components/tailwindcss/CategoryFilters";
import CategoryPreviews from "@/components/tailwindcss/CategoryPreviews";
import Footer from "@/components/tailwindcss/Footer";
import Incentives from "@/components/tailwindcss/Incentives";
import ProductFeatures from "@/components/tailwindcss/ProductFeatures";
import ProductList from "@/components/tailwindcss/ProductList";
import ProductPreview from "@/components/tailwindcss/ProductPreview";
import PromoSection from "@/components/tailwindcss/PromoSection";
import StoreNavigation from "@/components/tailwindcss/StoreNavigation";

export default function ProductListPage() {
    return (
        <>
        <StoreNavigation />
        <CategoryFilters />
        <ProductsView />
        <Footer />
        </>
    )
}