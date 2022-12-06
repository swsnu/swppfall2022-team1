import axios from 'axios'

export const axiosConfig = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-Csrftoken',
})
// axiosConfig.defaults.xsrfCookieName = 'csrftoken'
// axiosConfig.defaults.xsrfHeaderName = 'X-CSRFToken'
