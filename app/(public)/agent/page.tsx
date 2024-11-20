'use client'
import BaseButton from "@/components/common/base-button";
import { navContext } from "@/providers/nav-provider";
import { Textarea } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";
import { FieldValues, useController, useForm } from "react-hook-form";

export default function Home() {
    const { showSideBar, setShowSideBar } = useContext(navContext)
    const {control,handleSubmit,reset}=useForm()
    const router=useRouter()
    function agentSubmit(e:FieldValues){

    }

    const {field,fieldState:{error}}=useController({control,name:"desc",rules:{required:"Enter Description"}})
    return (
        <>
            <form onSubmit={handleSubmit(agentSubmit)} className=" flex-1 flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 mr-4 mb-4">
                <div className="flex justify-between items-center pb-8 border-b-2 border-main-2">
                    <div className="flex gap-4 items-center font-semibold">
                        <Image src={"/agents/seo.svg"} alt="agent Icon" width={35} height={35} />
                        {/* <GiHamburgerMenu className="cursor-pointer" onClick={() => setShowSideBar(!showSideBar)} /> */}
                        <p className="text-text-2 font-semibold text-xl">SEO Search Agent</p>
                    </div>
                </div>
                <p className="text-text-1">Compares products and marketing ideas against insurance customer personas</p>
                <Textarea {...field} isInvalid={!!error} errorMessage={error?.message} classNames={{label:'font-semibold'}} label="Enter Your Insurance Website URL" labelPlacement="outside" placeholder="(Provide the full URL of your insurance company’s website to analyze its SEO.)" minRows={20} variant="bordered"/>
                <div className="flex justify-end gap-4">
                    <BaseButton onClick={()=>{
                        reset({desc:""})
                    }} variant="bordered" extraClass="min-w-40 bg-transparent text-main-1 border-main-1 ">Reset</BaseButton>
                    <BaseButton type="submit" extraClass="min-w-40">Go</BaseButton>
                </div>
            </form>
        </>
    )
}
