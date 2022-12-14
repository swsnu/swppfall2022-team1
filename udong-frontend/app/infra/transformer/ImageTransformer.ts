import { Image } from '../../domain/model/Image'
import { ImageDto } from '../dto/ImageDto'

export const fromDto = (dto: ImageDto): Image => {
    return {
        url: dto.url,
        key: dto.key,
    }
}

export const imageTransformer = {
    fromDto,
}
