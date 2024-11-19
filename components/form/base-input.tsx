import { Input, InputProps } from "@nextui-org/react";

interface BaseInputProps extends InputProps{
    
}

export default function BaseInput({placeholder,label,type,variant}:BaseInputProps){
    return(
        <>
        <Input type={type} variant={variant} placeholder={placeholder}/>
        </>
    )
}