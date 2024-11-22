'use client'

import { BaseTextAreaProps } from "@/utils/types"
import { Textarea } from "@nextui-org/react"
import { Control, useController } from "react-hook-form"

export default function BaseTextArea({control,name,rules,label,labelPlacement,placeholder,minRows=20,variant="bordered"}:BaseTextAreaProps) {
    const {field,fieldState:{error}}=useController({control,name,rules})
    return (
        <>
            <Textarea  {...field} isInvalid={!!error} errorMessage={error?.message} classNames={{ label: 'font-semibold' }} label={label} labelPlacement={labelPlacement} placeholder={placeholder} minRows={minRows} variant={variant} />
        </>
    )
}