import { BaseButtonProps } from "@/utils/types";
import { Button } from "@nextui-org/react";


export default function BaseButton({ extraClass, children, style, ...props }: BaseButtonProps) {
    return (
        <>
            <Button {...props} style={style} className={` bg-main-1 text-white ${extraClass}`}>
                {children}
            </Button>
        </>
    )
}