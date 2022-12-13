import { useQuery } from 'react-query'

import { axiosConfig } from '../infra/global'

export const useImage = (imgKey: string) => {
    const { data } = useQuery<string>(imgKey, async () => {
        const response = await axiosConfig.get(`/api/image/download?key=${imgKey}`)
        return response.data
    })
    return data
}
