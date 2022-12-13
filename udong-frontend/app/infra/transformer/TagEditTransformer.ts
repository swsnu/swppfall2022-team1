import { EditTag } from '../../domain/model/Tag'
import { TagEditDto } from '../dto/TagEditDto'

const toDto = (tag: EditTag): TagEditDto => {
    return {
        name: tag.name,
        new_users: tag.newUsers,
    }
}

export const tagEditTransformer = {
    toDto,
}
