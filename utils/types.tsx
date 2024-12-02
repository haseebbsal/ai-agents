import { AutocompleteProps, ButtonProps, InputProps, RadioGroupProps, SelectProps, TextAreaProps } from "@nextui-org/react"
import { DetailedHTMLProps, Dispatch, LabelHTMLAttributes } from "react"
import { Control, FieldValues, RegisterOptions } from "react-hook-form"

export interface BaseAgentProps {
    agentText: string,
    info?: string,
    imgSrc: string,
    agentId:string,
    setAgent:Dispatch<any>
}

export interface BaseButtonProps extends ButtonProps {
    extraClass?: string
}

export interface BaseAutoCompleteProps extends Omit<AutocompleteProps, 'children'> {
}

export interface BaseInputProps extends InputProps {
}

export interface BaseAgentInputProps extends InputProps {
    control:Control<FieldValues>;
    rules:Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
    name:string
}


export interface BaseRadioGroupProps extends RadioGroupProps{
    control:Control<FieldValues>;
    rules:Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
    name:string;
    data:string[]
}

export interface AgentFormInteface {
    imgSrc: string,
    agentText: string,
    agentInfo: string,
    agent: string
}


export interface BaseSelectProps extends Omit<SelectProps,'children'>{
    control:Control<FieldValues>;
    rules:Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
    name:string;
    data:(string | number)[]
}


export interface BaseFileProps{
    showHeader?:boolean,
    extraClass?:string,
    headerText?:string
    name:string,
    control:Control<FieldValues>;
    accept:string,
    multiple?:boolean,
    rules:Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
}


export interface BaseLabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
    text:string,
}


export interface BaseTextAreaProps extends TextAreaProps{
    control:Control<FieldValues>;
    name:string,
    rules:Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
}