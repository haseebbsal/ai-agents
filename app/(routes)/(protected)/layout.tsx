'use client';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Cookies from 'js-cookie'
export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    // console.log('coookieee',Cookies.get('accessToken'))
    return (
        <>
            {children}
        </>
    )
}