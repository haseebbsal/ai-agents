import { BaseSelectProps } from "@/utils/types";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useController } from "react-hook-form";

export default function BaseSelect({control,name,rules,data,label,labelPlacement,placeholder}:BaseSelectProps) {
    const router=useRouter()
    const { field, fieldState: { error }} = useController({ control, name, rules })
    return (
        <Select
            label={label}
            labelPlacement={labelPlacement}
            classNames={{label:"font-semibold"}}
            {...field}
            isInvalid={!!error}
            onSelectionChange={(k)=>{
                field.onChange(Number(k.currentKey))
                router.refresh()
            }}
            // onChange={()=>{
            //     field.onChange
            // }}
            errorMessage={error?.message}
            placeholder={placeholder}

        >
            {data.map((animal) => (
                <SelectItem key={animal}>
                    {animal}
                </SelectItem>
            ))}
        </Select>
    )
}