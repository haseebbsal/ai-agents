import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
export default function Footer() {
    return (
        <>
            <div className="w-full flex justify-center bg-backgroundColors-1 p-4 border-t-1 border-main-2">
                <div className="sm:w-1/2 w-full flex flex-col gap-2 items-center">
                    <div className="flex gap-2 w-full justify-center">
                        <FaLinkedin />
                        <FaTwitter />
                        <FaFacebookSquare />
                    </div>
                    <p className="text-center">Copyright OnStartups LLC, All Rights Reserved | <span className="text-text-2">Terms of Use |</span> <span className="text-text-2">Privacy Policy</span></p>
                </div>
            </div>
        </>
    )
}