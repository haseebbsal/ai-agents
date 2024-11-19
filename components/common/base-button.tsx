import { Button, ButtonProps } from "@nextui-org/react";

interface BaseButtonProps extends ButtonProps{
}
export default function BaseButton({className,children,...props}:BaseButtonProps){
    return (
        <>
        <Button {...props} className={` bg-main-1 text-white  ${className}`}>
           {children}
        </Button>
        </>
    )
}