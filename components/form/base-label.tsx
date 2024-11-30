import { BaseLabelProps } from "@/utils/types";

export default function BaseLabel({text,htmlFor,className}:BaseLabelProps){
    return(
        <>
        <label htmlFor={htmlFor} className={`border-2 border-base-default cursor-pointer z-10 hover:text-white hover:bg-main-1 relative text-black p-2 rounded-lg ${className}`}>
            {text}
        </label>
        </>
    )
}