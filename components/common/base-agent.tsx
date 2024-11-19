import { SlOptions } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";
import BaseButton from "./base-button";

interface BaseAgentProps {
    agentText:string,
    credit:string,
    execution:string
    info:string
}
export default function BaseAgent({agentText,credit,execution,info}:BaseAgentProps) {
    return (
        <>
            <div className="p-4 flex flex-col gap-[1.5rem] flex-1 w-[20rem] min-h-44 border-2 rounded-lg border-main-2">
                <div className="flex justify-between items-center">
                    <VscAccount className="text-main-1 text-2xl" />
                    <SlOptions />
                </div>
                <div className="flex flex-col gap-2 border-b-2 border-main-2 pb-4">
                    <p className="text-text-2 text-2xl">{agentText}</p>
                    <div className="flex gap-4">
                        <p className="bg-backgroundColors-2 p-2 rounded-lg"><span className="text-text-2">{credit}</span> / Execution</p>
                        <p className="bg-backgroundColors-2 p-2 rounded-lg"><span className="text-text-2">{execution}</span> Executions</p>
                    </div>
                </div>
                <p className="text-text-1">{info}</p>
                <BaseButton >Hire</BaseButton>
            </div>
        </>
    )
}