import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfases/product.interface";
import { sleep } from "@/lib/sleep";

export interface FileUploadResponse {
    secureUrl: string,
    fileName: string
}

export const createUpdateProduct = async (productLike: Partial<Product> & { files?: File[] }): Promise<Product> => {

    await sleep(1500)

    const { id, user, images = [], files = [], ...rest } = productLike;

    if (files.length > 0) {
        const newImagesUpload = await uploadFiles(files);
        images.push(...newImagesUpload)
    }

    const imageSaveToUrl = images.map(img => {
        if (img.includes('http')) return img.split('/').pop();
        return img;
    })

    const isCreating = id === 'new';

    rest.price = Number(rest.price || 0)
    rest.stock = Number(rest.stock || 0)

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest,
            images: imageSaveToUrl
        }
    })


    return {
        ...data,
        images: data.images.map(image => {
            if (image.includes('http')) return image;
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`
        })
    }
}

const uploadFiles = async (files: File[]) => {

    const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file)

        const { data } = await tesloApi<FileUploadResponse>({
            url: '/files/product',
            method: 'POST',
            data: formData
        })

        return data.fileName
    })

    const uploadFilesNames = await Promise.all(uploadPromises);
    return uploadFilesNames;
}
