import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "../components/CustomJumbotron"
import { ProductsGrid } from "../components/ProductsGrids"
import { useParams } from "react-router"
import { useProducts } from "@/shop/hooks/useProducts"

export const GenderPage = () => {
    const { gender } = useParams();
    const { data } = useProducts()

    const genderLabel = gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Niños';

    return (
        <>
            <CustomJumbotron title={`Productos para ${genderLabel}`} />
            <ProductsGrid products={data?.products || []}></ProductsGrid>
            <CustomPagination totalPages={data?.pages || 1} />
        </>
    )
}