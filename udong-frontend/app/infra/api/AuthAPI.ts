import axios from 'axios'

export const AuthAPI = (() => {
    async function signIn(email: string, token: string, name: string): Promise<void> {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-Csrftoken'
        axios.defaults.withCredentials = true

        return await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + `/api/auth/signin/`,
            { email, token, name },
        )
    }
    async function signOut(): Promise<void> {
        axios.defaults.withCredentials = true
        return await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + `/api/auth/signout/`,
        )
    }

    return Object.freeze({
        signIn,
        signOut,
    })
})()
