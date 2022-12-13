import { useQuery } from 'react-query'

import { axiosConfig } from '../infra/global'

export const useImage = (imgKey: string) => {
    const { data } = useQuery<string, unknown, string, string>(
        imgKey,
        async ({ queryKey } : { queryKey: string[] }) => {
            if(!queryKey[0]) {
                return ''
            }
            const response = await axiosConfig.get(`/api/image/download/?key=${queryKey[0]}`)
            return response.data
        },
        { staleTime: 200 * 1000 },
    )
    return data
}
