import { BaseRadioGroupProps } from "@/utils/types";
import { Radio, RadioGroup } from "@nextui-org/react";
import { useController } from "react-hook-form";

export default function BaseRadioGroup({ name, control, rules,label ,data}: BaseRadioGroupProps) {
    const { field, fieldState: { error } } = useController({ control, name, rules })
    return (
        <RadioGroup
            {...field}
            label={label}
            classNames={{
                label: "font-semibold text-black"
            }}
            isInvalid={!!error}
            errorMessage={error?.message}
        >
            {data.map((e)=><Radio value={e}>{e}</Radio>)}
        </RadioGroup>
    )
}