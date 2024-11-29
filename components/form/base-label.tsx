import { BaseLabelProps } from "@/utils/types";

export default function BaseLabel({text,htmlFor,className}:BaseLabelProps){
    return(
        <>
        <label htmlFor={htmlFor} className={`border-2 border-base-default cursor-pointer  text-black p-2 rounded-lg ${className}`}>
            {text}
        </label>
        </>
    )
}