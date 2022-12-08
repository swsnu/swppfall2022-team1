import { Tag } from '../../domain/model/Tag'
import { TagUserDto } from '../dto/TagUserDto'
import { axiosConfig } from '../global'
import { tagUserTransformer } from '../transformer/TagUserTransformer'

export const TagAPI = (() => {
    async function getTag(tagId: number): Promise<Tag> {
        const response = await axiosConfig.get<TagUserDto>(`/api/tag/${tagId}/`)
        return tagUserTransformer.fromDto(response.data)
    }
    function editTag() { return }
    function deleteTag() { return }

    return Object.freeze({
        getTag,
        editTag,
        deleteTag,
    })
})()
