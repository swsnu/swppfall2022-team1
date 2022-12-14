import { Image } from '../../domain/model/Image'
import { ImageDto } from '../dto/ImageDto'
import { axiosConfig } from '../global'
import { imageTransformer } from '../transformer/ImageTransformer'

export const ImageAPI = (() => {
    async function getUploadUrl(filename: string): Promise<Image> {
        const response = await axiosConfig.get<ImageDto>(`/api/upload/?file=${filename}`)
        return imageTransformer.fromDto(response.data)
    }

    async function uploadImage(url: string, file: File): Promise<void> {
        await axiosConfig.put<void>(url, file)
    }
    return Object.freeze({
        getUploadUrl,
        uploadImage,
    })
})()
