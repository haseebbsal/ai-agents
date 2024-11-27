import { BaseButtonProps } from "@/utils/types";
import { Button } from "@nextui-org/react";


export default function BaseButton({ extraClass, children, style,variant,type,isDisabled,isLoading, ...props}: BaseButtonProps) {
    return (
        <>
            <Button type={type} isDisabled={isDisabled} isLoading={isLoading} variant={variant} {...props} style={style} className={` bg-main-1 text-white ${extraClass}`}>
                {children}
            </Button>
        </>
    )
}