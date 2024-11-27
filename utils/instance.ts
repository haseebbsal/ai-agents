import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
export const axiosInstance=axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_URL
})


axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.url == '/auth/tokens') {
        config.headers.Authorization= `Bearer ${Cookies.get('refreshToken')}`
    }
    else {
        if (!config.url?.includes('/auth')) {
            if (Cookies.get('accessToken')) {
                config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`
            }
            
            else {
                console.log('url',config.url)
                window.location.href='/login'
            }
        }
        // console.log('token',Cookies.get('accessToken'))
        // else {
        //     window.location.href='/auth/login'
        // }
    }
    return config
})
axiosInstance.interceptors.response.use((response:AxiosResponse) => {
    if(response.config.url?.includes('/login')){
        // console.log('axios login',response.data)
        const { access_token, refresh_token } =response.data.tokens
        // console.log('new tokens set',access_token,refreshT)
        Cookies.set('accessToken', access_token)
        Cookies.set('refreshToken', refresh_token)
        Cookies.set('userData',JSON.stringify({email:response.data.email}))
        // if(response.data.data.user.isApproved){
        //     const { access_token, refresh_token } =response.data.tokens
        //     // console.log('new tokens set',access_token,refreshT)
        //     Cookies.set('accessToken', access_token)
        //     Cookies.set('refreshToken', refresh_token)
        //     Cookies.set('userData',JSON.stringify({email:response.data.email}))
        // }
        // else{
        //     const { access_token, refresh_token } =response.data.data.tokens
        //     localStorage.setItem('accessToken',access_token)
        //     localStorage.setItem('refreshToken',refresh_token)
        //     localStorage.setItem('userData',JSON.stringify(response.data.data.user))
        // }
    }
    else if(response?.config.url?.includes('/logout')){
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('userData')
        window.location.href='/login'
    }

    return response
}, async (error: AxiosError) => {
    if(error.response?.config.url?.includes('/logout')){
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('userData')
        window.location.href='/login'
    }
    if((error.response?.data as any).detail == "Unauthorized") {
        console.log('token expired')
        const refreshToken = Cookies.get('refreshToken')
        try {
            const refreshTokenFetch=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/tokens`, {
                headers: {
                    Authorization:`Bearer ${refreshToken}`
                }
            })
            const { access_token, refresh_token } = refreshTokenFetch.data
            console.log('new tokens set',access_token,refreshToken)
            Cookies.set('accessToken', access_token)
            Cookies.set('refreshToken', refresh_token)
            return axiosInstance({
                ...error.config, headers: {
                ...error.config?.headers,Authorization:`Bearer ${access_token}`
            }})
        }
        catch (e) {
            console.log('refresh token error')
            try {
                Cookies.remove('userData')
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
            }
            catch(e) {
                console.log('userdata error', e)
            }
        }
    }
    
    console.log('interceptor error', error)
    return Promise.reject(error);
})

// console.log('backend',process.env.NEXT_PUBLIC_BACKEND_URL)



