import { BaseAgentInputProps, BaseInputProps } from "@/utils/types";
import { Input, InputProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useController } from "react-hook-form";

export default function BaseAgentInput({ placeholder, label, type, variant,name,control,rules,labelPlacement }: BaseAgentInputProps) {
    const { field, fieldState: { error } } = useController({ control, name, rules })
    const router=useRouter()
    return (
        <>
            <Input label={label} labelPlacement={labelPlacement} classNames={{
                label:"font-semibold"
            }} type={type} variant={variant} placeholder={placeholder} {...field} isInvalid={!!error} onChange={(e)=>{
                field.onChange(e.target.value)
                router.refresh()
            }} errorMessage={error?.message} />
        </>
    )
}