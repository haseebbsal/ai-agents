import Image from "next/image";
import BaseButton from "./base-button";
import Link from "next/link";

export default function HomeNavbar(){
    return(
        <>
        <nav className="flex sm:justify-between justify-center sm:gap-0 gap-4 p-4 border-b-1 flex-wrap border-main-2 bg-backgroundColors-1">
            <Link href={'/'}><Image src={'/common/logo.svg'} alt="home logo" width={200} height={200}/></Link>
            
            <div className="flex gap-4">
                <BaseButton extraClass="min-w-28">Sign In</BaseButton>
                <BaseButton extraClass="min-w-28">Sign Up</BaseButton>
            </div>
        </nav>
        </>
    )
}