import Image from "next/image";
import BaseButton from "./base-button";

export default function HomeNavbar(){
    return(
        <>
        <nav className="flex justify-between p-4 border-b-2 border-main-2 bg-backgroundColors-1">
            <Image src={'/common/logo.svg'} alt="home logo" width={200} height={200}/>
            <div className="flex gap-4">
                <BaseButton className="min-w-28">Sign In</BaseButton>
                <BaseButton className="min-w-28">Sign Up</BaseButton>
            </div>
        </nav>
        </>
    )
}