import { axiosConfig } from '../global'

export const AuthAPI = (() => {
    async function signIn(email: string, token: string, name: string): Promise<void> {
        return await axiosConfig.post(
            `/api/auth/signin/`,
            { email, token, name },
        )
    }
    async function signOut(): Promise<void> {
        return await axiosConfig.post(
            `/api/auth/signout/`,
        )
    }

    return Object.freeze({
        signIn,
        signOut,
    })
})()
