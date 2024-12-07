'use client'
import Image from "next/image";
import BaseButton from "./base-button";
import Link from "next/link";
import Cookies from 'js-cookie'
import { useMutation } from "react-query";
import { axiosInstance } from "@/utils/instance";
import { useRouter } from "next/navigation";

export default function HomeNavbar(){
    const router=useRouter()
    const logoutMutation=useMutation(()=> axiosInstance.post('/logout'))
    return(
        <>
        <nav className="flex sm:justify-between justify-center sm:gap-0 gap-4 p-4  flex-wrap items-center border-main-2 ">
            <Link href={'/'}><Image src={'/common/logo.svg'} alt="home logo" className="w-[200px] h-[60px] object-contain" width={200} height={200}/></Link>
            
            {!Cookies.get('accessToken') && <div className="flex gap-4">
                <Link className="bg-main-1 text-white min-w-28 flex items-center justify-center rounded-lg  !h-[3rem]" href={'/login'}>Sign In</Link>
                <Link className="bg-main-1 text-white min-w-28 flex items-center justify-center rounded-lg !h-[3rem]" href={'/register'}>Sign Up</Link>

                {/* <BaseButton extraClass="min-w-28">Sign In</BaseButton>
                <BaseButton extraClass="min-w-28">Sign Up</BaseButton> */}
            </div> }
            {
                Cookies.get('accessToken') && <BaseButton isLoading={logoutMutation.isLoading} isDisabled={logoutMutation.isLoading} onClick={()=>logoutMutation.mutate()} extraClass="min-w-28 !h-[3rem]">Log Out</BaseButton>
            }

        </nav>
        </>
    )
}