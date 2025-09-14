
import CategoryFilters from "@/components/tailwindcss/CategoryFilters";
import Footer from "@/components/tailwindcss/Footer";
import ProductList from "@/components/tailwindcss/ProductList";
import StoreNavigation from "@/components/tailwindcss/StoreNavigation";


export default function ProductListPage() {
    return (
        <>
        <StoreNavigation />
        <CategoryFilters />
        <ProductList />
        <Footer />
        </>
    )
}