'use client'
import { FieldValues, useForm } from "react-hook-form"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import { useEffect, useRef, useState,use } from "react"
import Markdown from "react-markdown"
import { IoSend } from "react-icons/io5";
import { FaRobot, FaRocketchat, FaUser } from "react-icons/fa"
import { AgentFormInteface } from "@/utils/types"
import BaseAgentInput from "@/components/form/base-input-agent"
import BaseButton from "@/components/common/base-button"

export default function PolicyForm({params}:{params:any}) {
    const{pdf}=use<any>(params)
    const chatRef = useRef<any>()
    const { control, handleSubmit, reset, getValues } = useForm()
    const [chatFile, setChatFile] = useState<any>(pdf)
    const [chatUserQueries, setChatUserQueries] = useState<any>([])
    const [chatList, setChatList] = useState<any>([])
 
    const sendChatMutation=useMutation((data:any)=>axiosInstance.post('/onboarding-agent/chat',data),{
        onSuccess(data, variables, context) {
            console.log('chat success',data.data)
            console.log('chatlist',chatList)
            setChatList((prev:any)=>[...prev,{
                ...data.data.result,
                value:data.data.result.raw
            }])
        },
    })



    function chatQuerySubmit(e: FieldValues) {
        setChatUserQueries([...chatUserQueries, e.user_input])
        setChatList([...chatList, { type: 1, value: e.user_input }])
        reset({ user_input: "" })
        const context=chatList.map((j:any)=>{
            if(j.type==1){
                return `user:${j.value}`
            }
            return `assistant:${j.value}`
        }).join(',')
        const data={
            query:e.user_input,
            context,
            pdf:chatFile
        }
        sendChatMutation.mutate(data)
    }


    useEffect(() => {
        if (chatRef.current) {
            const lastElement = chatRef.current.children
            if (lastElement.length > 0) {
                lastElement[lastElement.length - 1].scrollIntoView()
            }
        }
    }, [chatList])

    return (
        <>
           
            {<div className="flex-1 ml-4 flex flex-col gap-4 p-4 border-2 h-[80vh]  rounded-lg border-main-2  mt-4  mb-4">
                <div ref={chatRef} className="flex flex-col gap-4 flex-1  overflow-auto">
                {chatList.length==0 && <p className="m-auto font-semibold flex gap-2 items-center text-sm"><FaRocketchat className="text-main-1" /> Spark a conversation ! <FaRocketchat className="text-main-1"/></p>}
                    {chatList?.map((e: any, index: number) =>
                        <div key={index} className={`flex w-full ${e.type == 1 ? "justify-start" : "justify-end"}`}>
                            <div className="flex flex-col gap-2 sm:max-w-[20%] max-w-[90%] min-w-[40%] ">
                                {e.type==1?<FaUser className="text-main-1"/>:<FaRobot className="text-main-1"/>}
                                <div className=" p-4 bg-main-1 text-white w-full rounded-lg ">
                                    <Markdown>{e.value}</Markdown>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit(chatQuerySubmit)} className=" flex-[0.05_0_0] flex gap-4 mt-auto items-end">
                    <BaseAgentInput control={control} name="user_input" rules={{ required: "Please Enter Your Query" }} placeholder="Enter Your Query" />
                    <BaseButton type="submit" isLoading={sendChatMutation.isLoading} isDisabled={sendChatMutation.isLoading} className="min-w-28"><IoSend /></BaseButton>
                </form>
            </div>}
        </>
    )
}