import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import { createUpdateProduct } from "../actions/create-update-product.action"
import type { Product } from "@/interfases/product.interface"

export const useProduct = (id: string) => {

    const queryClient = useQueryClient()
    
    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5
    })

    const mutation = useMutation({
        mutationFn: createUpdateProduct,
        onSuccess: (product:Product) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] })
            
            queryClient.setQueryData(['products',{id:product.id}],product)
        }
    })

    return {...query,mutation}
    
} 