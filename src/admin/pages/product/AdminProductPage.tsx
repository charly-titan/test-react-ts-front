import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import type { Product } from '@/interfases/product.interface';
import { ProductForm } from './ui/ProductForm';



export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const { isLoading, data: product, isError, mutation } = useProduct(id || '')
  
  const handleSubmitForm = async (productLike: Partial<Product> & { files?: File[] }) => {
    console.log(productLike)
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Se ha actualizado correctamente", {
          position:'top-right'
        })
        navigate(`/admin/products/${data.id}`)
      },
      onError: (_error) => {
        toast.error("ocurrio un error al actualizar", {
          position:'top-right'
        })
      } 
    });
  }
  

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subTitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';


  if (isError) return <Navigate to='/admin/products' />
  if(isLoading) return <CustomFullScreenLoading/>
  if (!product) return <Navigate to='/admin/products' />
  
  return <ProductForm
    onSubmit={handleSubmitForm}
    title={title}
    subtTitle={subTitle}
    product={product}
    isPending = {mutation.isPending}
  />

};