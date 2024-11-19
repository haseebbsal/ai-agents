'use client'
import { Autocomplete, AutocompleteItem, AutocompleteProps } from "@nextui-org/react";


export const animals = [
    { label: "", value: "", description: "" }
];



interface BaseAutoCompleteProps extends Omit<AutocompleteProps,'children'>{

}

export default function BaseAutoComplete({ placeholder }: BaseAutoCompleteProps) {
    return (
        <>
            <Autocomplete
                placeholder={placeholder}
                className="w-full"
            >
                {animals.map((animal) => (
                    <AutocompleteItem key={animal.value} value={animal.value}>
                        {animal.label}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </>
    )
}