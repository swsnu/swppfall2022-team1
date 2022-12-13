import { useQuery } from 'react-query'

import { axiosConfig } from '../infra/global'

export const useImage = (imgKey: string) => {
    const { data } = useQuery<string, unknown, string, string[]>(
        ['getImageUrl', imgKey],
        async () => {
            if(!imgKey) {return ''}
            const response = await axiosConfig.get(`/api/image/download/?key=${imgKey}`)
            return response.data
        },
        { staleTime: 200 * 1000 },
    )
    return data
}
