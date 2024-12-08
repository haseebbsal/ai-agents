import Image from "next/image"
import { FieldValues, useForm } from "react-hook-form"
import BaseButton from "../common/base-button"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import { useContext, useEffect, useRef, useState } from "react"
import Markdown from "react-markdown"
import BaseFile from "../form/base-file"
import BaseAgentInput from "../form/base-input-agent"
import { IoSend } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { AgentFormInteface } from "@/utils/types"
import { FaRocketchat } from "react-icons/fa";
import { navContext } from "@/providers/nav-provider"
import Instructions from "../common/instructions"

export default function VirtualAssistantForm({ imgSrc, agentInfo, agentText, agent }: AgentFormInteface) {
    const chatRef = useRef<any>()
    const { control, handleSubmit, reset, getValues } = useForm()
    const [chatFile, setChatFile] = useState<any>()
    const [chatUserQueries, setChatUserQueries] = useState<any>([])
    const [chatList, setChatList] = useState<any>([])
    const { setShowInstructions } = useContext(navContext)

    const deleteFileMutation = useMutation((data: any) => axiosInstance.post(`/files`, data))
    const startChatMutation = useMutation((data: any) => axiosInstance.postForm(`/start/virtual-chat`, data), {
        onSuccess(data, variables, context) {
            console.log('file', data.data)
            setChatFile(data.data.result)
            setShowInstructions(false)
        },
    })

    const sendChatMutation = useMutation((data: any) => axiosInstance.post('/virtual-chat/chat', data), {
        onSuccess(data, variables, context) {
            console.log('chat success', data.data)
            console.log('chatlist', chatList)
            setChatList((prev: any) => [...prev, {
                ...data.data.result,
                value: data.data.result.raw
            }])
        },
    })


    function agentSubmit(e: FieldValues) {
        const formData = new FormData()
        Object.values(e.agent).forEach((f, number: number) => {
            formData.append(`file`, f as any)
        })
        console.log([...formData.entries()])
        startChatMutation.mutate(formData)
    }

    function chatQuerySubmit(e: FieldValues) {
        setChatUserQueries([...chatUserQueries, e.user_input])
        setChatList([...chatList, { type: 1, value: e.user_input }])
        reset({ user_input: "" })
        const data = {
            query: e.user_input,
            context: chatUserQueries,
            pdf: chatFile

        }
        sendChatMutation.mutate(data)
    }

    // console.log(chatUserQueries)
    useEffect(() => {

        if (chatFile) {
            window.onbeforeunload = () => {
                deleteFileMutation.mutate({ files: chatFile })
                setShowInstructions(true)
            }
            return () => {
                deleteFileMutation.mutate({ files: chatFile })
                setShowInstructions(true)
            }
        }
    }, [chatFile])

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
            {!chatFile &&
                <div className="flex flex-1 flex-wrap flex-col gap-4 w-full sm:p-0 p-4 ">
                    <div className="flex flex-1 flex-wrap gap-4 w-full sm:p-0 p-4">
                        <Instructions />
                        <form onSubmit={handleSubmit(agentSubmit)} className=" flex-1  flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 sm:mr-4 mb-4">
                            <div className="flex justify-between items-center pb-8 border-b-2 border-main-2">
                                <div className="flex gap-4 items-center font-semibold">
                                    <Image src={imgSrc} alt="agent Icon" width={35} height={35} />
                                    <p className="text-text-2 font-semibold text-xl">{agentText}</p>
                                </div>
                            </div>
                            <p className="text-text-1">{agentInfo}</p>
                            <div className="flex flex-col gap-4">
                                <BaseFile multiple={true} accept=".pdf,.docx,.txt" headerText="Upload One Or More Pdfs" showHeader={true} control={control} name="agent" rules={{ required: "Select File" }} />
                            </div>
                            <div className="flex justify-end gap-4">
                                <BaseButton isDisabled={startChatMutation.isLoading} isLoading={startChatMutation.isLoading} type="submit" extraClass="min-w-40">Start Chat</BaseButton>
                            </div>
                            {/* <div className=" overflow-auto max-h-[40rem]">
                    {
                        startChatMutation.data?.data && <Markdown>{startChatMutation.data.data.result.raw}</Markdown>
                    }
                </div> */}
                        </form>
                    </div>
                </div>

            }

            {chatFile && <div className="flex-1 ml-4 flex flex-col gap-4 p-4 border-2 h-[80vh]  rounded-lg border-main-2  mt-4 mr-4 mb-4">
                <div ref={chatRef} className="flex flex-col gap-4 flex-1  overflow-auto">
                    {chatList.length == 0 && <p className="m-auto font-semibold flex gap-2 items-center text-sm"><FaRocketchat className="text-main-1" /> Spark a conversation ! <FaRocketchat className="text-main-1" /></p>}
                    {chatList?.map((e: any, index: number) =>
                        <div key={index} className={`flex w-full ${e.type == 1 ? "justify-start" : "justify-end"}`}>
                            <div className="flex flex-col gap-2 sm:max-w-[20%] max-w-[90%] min-w-[40%] ">
                                {e.type == 1 ? <FaUser className="text-main-1" /> : <FaRobot className="text-main-1" />}
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