import { EditTag, Tag } from '../../domain/model/Tag'
import { TagUserDto } from '../dto/TagUserDto'
import { axiosConfig } from '../global'
import { tagEditTransformer } from '../transformer/TagEditTransformer'
import { tagUserTransformer } from '../transformer/TagUserTransformer'

export const TagAPI = (() => {
    async function getTag(tagId: number): Promise<Tag> {
        const response = await axiosConfig.get<TagUserDto>(`/api/tag/${tagId}/`)
        return tagUserTransformer.fromDto(response.data)
    }

    async function editTag(tagId: number, tag: EditTag): Promise<Tag> {
        const response = await axiosConfig.put<TagUserDto>(
            `/api/tag/${tagId}/`,
            tagEditTransformer.toDto(tag),
        )
        return tagUserTransformer.fromDto(response.data)
    }

    async function deleteTag(tagId: number): Promise<void> {
        return await axiosConfig.delete(`/api/tag/${tagId}/`)
    }

    return Object.freeze({
        getTag,
        editTag,
        deleteTag,
    })
})()
