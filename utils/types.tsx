import { AutocompleteProps, ButtonProps, InputProps } from "@nextui-org/react"

export interface BaseAgentProps {
    agentText: string,
    info: string,
    imgSrc: string
}

export interface BaseButtonProps extends ButtonProps {
    extraClass?: string
}

export interface BaseAutoCompleteProps extends Omit<AutocompleteProps, 'children'> {
}

export interface BaseInputProps extends InputProps {
}