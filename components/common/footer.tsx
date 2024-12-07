import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
export default function Footer() {
    return (
        <>
            <div className="w-full justify-center flex items-center flex-col gap-4 bg-main-1 text-white sm:px-4 sm:py-4 pt-16 pb-8  min-h-[20rem] border-t-1 border-main-2">
                <div className=" w-full mt-auto flex sm:flex-nowrap flex-wrap justify-center sm:gap-28 gap-8 items-center">
                    <div className="flex flex-col  gap-4">
                        <h1  className="text-2xl">United Arab Emirates</h1>
                        <div className="flex flex-col gap-2">
                            <p>eData Information Technology</p>
                            <p>Al Saqr Business Tower, Office 802</p>
                            <p>SZR, DIFC side, Dubai</p>
                            <p>Tel: +971 4 320 7073 </p>
                        </div>
                    </div>
                    <div className="flex flex-col  gap-4">
                        <h1  className="text-2xl">Oman</h1>
                        <div className="flex flex-col gap-2">
                            <p>eData Information Technology</p>
                            <p>Al Nawras Complex, Office 705</p>
                            <p>Al Khuwair street, Al Khuwair, Muscat</p>
                            <p>Tel: +968 9 522 8951</p>
                        </div>
                    </div>
                    <div className="flex flex-col  gap-4">
                        <h1 className="text-2xl" >Egypt</h1>
                        <div className="flex flex-col gap-2">
                            <p>eData Information Service</p>
                            <p>Arabella Plaza, Office 319</p>
                            <p>Gamal Abdel Nasser street, New Cairo</p>
                            <p>Tel: +20 109 911 2129</p>
                        </div>
                    </div>
                </div>
                <p className="text-center my-auto">© 2024 eData Information.All rights reserved.</p>
            </div>
        </>
    )
}



