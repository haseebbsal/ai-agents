import { Button, ButtonProps } from "@nextui-org/react";

interface BaseButtonProps extends ButtonProps{
    extraClass?:string
}
export default function BaseButton({extraClass,children,style,...props}:BaseButtonProps){
    return (
        <>
        <Button {...props} style={style} className={` bg-main-1 text-white ${extraClass}`}>
           {children}
        </Button>
        </>
    )
}