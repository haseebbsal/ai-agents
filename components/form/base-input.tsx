import { BaseInputProps } from "@/utils/types";
import { Input, InputProps } from "@nextui-org/react";

export default function BaseInput({ placeholder, label, type, variant }: BaseInputProps) {
    return (
        <>
            <Input type={type} variant={variant} placeholder={placeholder} />
        </>
    )
}