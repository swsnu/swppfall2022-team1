import axios from 'axios'

export const axiosConfig = axios.create({
    baseURL: 'http://ec2-43-201-28-80.ap-northeast-2.compute.amazonaws.com',
})
