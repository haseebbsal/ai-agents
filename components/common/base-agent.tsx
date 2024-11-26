import { SlOptions } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";
import BaseButton from "./base-button";
import Image from "next/image";
import { BaseAgentProps } from "@/utils/types";
import { useRouter } from "next/navigation";


export default function BaseAgent({ agentText, info, imgSrc ,setAgent,agentId}: BaseAgentProps) {
    const router=useRouter()
    const navigate=()=>{
        setAgent(agentId)
        router.push('/agent')
    }

    return (
        <>
            <div className="p-4 flex flex-col gap-[1.5rem] flex-[1_0_20%]  min-h-44 border-2 rounded-lg border-main-2">
                <div className="flex justify-between items-center">
                    <Image src={imgSrc} alt="agent Icon" width={35} height={35} />
                    {/* <SlOptions /> */}
                </div>
                <div className="flex flex-col gap-2 border-b-2 border-main-2 pb-4">
                    <p className="text-text-2 text-xl font-semibold">{agentText}</p>
                    {/* <div className="flex gap-4">
                        <p className="bg-backgroundColors-2 p-2 rounded-lg"><span className="text-text-2">{credit}</span> / Execution</p>
                        <p className="bg-backgroundColors-2 p-2 rounded-lg"><span className="text-text-2">{execution}</span> Executions</p>
                    </div> */}
                </div>
                <p className="text-text-1">{info}</p>
                <BaseButton onClick={navigate} style={{ marginTop: "auto" }}>Hire</BaseButton>
            </div>
        </>
    )
}