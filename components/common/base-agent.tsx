import { SlOptions } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";
import BaseButton from "./base-button";
import Image from "next/image";
import { BaseAgentProps } from "@/utils/types";
import { useRouter } from "next/navigation";


export default function BaseAgent({ agentText, info, imgSrc, setAgent, agentId }: BaseAgentProps) {
    const router = useRouter()
    const navigate = () => {
        setAgent(agentId)
        router.push('/agent')
    }

    return (
        <>
            <div className=" h-full flex flex-col  min-h-44 border-2 rounded-lg border-main-2">
                <div  className="flex bg-main-1 justify-between items-center rounded-tl-lg rounded-tr-lg  min-h-20 relative">
                    <div className="absolute w-full top-1/2  flex justify-center z-10">
                        <Image className="bg-white p-4 object-contain h-[5rem] w-[5rem] border-2 rounded-full border-main-1" src={imgSrc} alt="agent Icon" width={50} height={50} />
                    </div>
                </div>
                <div className="p-4 flex flex-col mt-[3rem] gap-[1.5rem] flex-1">
                    <div className="flex flex-col gap-2 border-b-2 border-main-2 pb-4">
                        <p className="text-text-2 text-xl text-center font-semibold">{agentText}</p>
                    </div>
                    <p className="text-text-1">{info}</p>
                    <BaseButton extraClass="sm:w-[10rem] mx-auto w-full " onClick={navigate} style={{ marginTop: "auto" }}>Use Agent</BaseButton>
                </div>
            </div>
        </>
    )
}