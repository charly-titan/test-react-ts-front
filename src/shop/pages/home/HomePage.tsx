import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "../components/CustomJumbotron"
import { ProductsGrid } from "../components/ProductsGrids"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {

    const { data } = useProducts();

    return (
        <>
            <CustomJumbotron title="Todos los Productos" />
            <ProductsGrid products={data?.products|| []}></ProductsGrid>
            <CustomPagination totalPages={data?.pages || 1} />
        </>
        
    )
}