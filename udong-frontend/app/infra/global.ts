import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const axiosConfig = axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
})
