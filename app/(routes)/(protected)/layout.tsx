import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const checkCookies=await cookies()
    if(!checkCookies.get('accessToken')){
        redirect('/login')
    }
    return (
        <>
            {children}
        </>
    )
}