import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

type UserData = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    profilePicture: string,
    role: string,
    isApproved: boolean,
    createdAt: string,
    updatedAt: string
}


export default async function Middleware(request: NextRequest) {
    const cookiesInitialise = await cookies()
    const accessToken = cookiesInitialise.get('accessToken')?.value
    const refreshToken = cookiesInitialise.get('refreshToken')?.value
    let userData: UserData | any = cookiesInitialise.get('userData')?.value
    console.log('pathname',request.nextUrl.pathname)
    if (accessToken) {
        try {
            const accessTokenChecking = await axios.get(`${process.env.BACKEND_URL}/user`, {
                headers: {
                    Authorization:`Bearer ${accessToken}`
                }
            })
          
        }
        catch {
            try {
                const refreshTokenChecking = await axios.post(`${process.env.BACKEND_URL}/auth/tokens`, {refreshToken})
                // console.log('refreshhh',refreshTokenChecking.data)
                const { access_token, refresh_token } = refreshTokenChecking.data
                const response = NextResponse.next()
                console.log('new middleware refresh tokens set')
                response.cookies.set('accessToken', access_token)
                response.cookies.set('refreshToken', refresh_token)
                return response
            }
            catch (e) {
                // console.log('errrrrooooooor')
                console.log('middleware refreshtoken error')
                const { role } = userData
                let response; 
                response = NextResponse.rewrite(new URL('/login', request.nextUrl.origin))
                response.cookies.delete('accessToken')
                response.cookies.delete('refreshToken')
                response.cookies.delete('userData')
                return response
            }
        }
    }
    else {
        console.log('im here')
        return NextResponse.rewrite(new URL('/login', request.nextUrl.origin))
    }
}


export const config = {
    matcher: [
        "/",
        '/agent/:path*',
        '/agents'
    ]
}