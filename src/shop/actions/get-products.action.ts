import { tesloApi } from "@/api/tesloApi"
import type { ProductsResponse } from "@/interfases/products.response";

interface Options {
    limit?: number | string,
    offset?: number | string,
    gender?: string,
    sizes?: string,
    minPrice?: number,
    maxPrice?: number,
    q?: string
}

export const getProductsAction = async (options: Options) => {

    const { limit, offset, gender, sizes, minPrice, maxPrice, q } = options;

    const { data } = await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit, offset, gender, sizes, minPrice, maxPrice, q
        }
    });

    const productsWithImagesUrl = data.products.map((product) => ({
        ...product,
        images: product.images.map((image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
    }))

    return {
        ...data,
        products: productsWithImagesUrl
    };

}