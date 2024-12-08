import Image from "next/image"
import { FieldValues, useForm } from "react-hook-form"
import BaseButton from "../common/base-button"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import Markdown from "react-markdown"
import BaseFile from "../form/base-file"
import { AgentFormInteface } from "@/utils/types"
import { useState } from "react"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import Instructions from "../common/instructions"

export default function OnboardingAgentForm({ imgSrc, agentInfo, agentText, agent }: AgentFormInteface) {
    const { control, handleSubmit, reset, getValues } = useForm()
    const [link, setLink] = useState<null | string>()
    const [data, setData] = useState<any>()
    const agentFileMutation = useMutation((data: any) => axiosInstance.postForm(`/start/onboarding-agent`, data), {
        onSuccess(data, variables, context) {
            console.log('file', data.data)
            setLink(`${window.location.origin}/agent/onboarding/${data.data.result}`)
            console.log('link', `${window.location.origin}/agent/onboarding/${data.data.result}`)
        },
    })
    console.log(data)

    function agentSubmit(e: FieldValues) {
        const formData = new FormData()
        formData.append('file', e.agent[0])
        agentFileMutation.mutate(formData)
    }

    function copyLink() {

        navigator.clipboard.writeText(link!);
    }


    return (
        <>
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
                            <BaseFile accept=".pdf" headerText="Upload Pdf Document" showHeader={true} control={control} name="agent" rules={{ required: "Select File" }} />
                            {link && <div className="flex flex-wrap gap-4 items-center"><p>This is the link to a personalized chatbot for HR policies</p> <BaseButton extraClass="w-max" onClick={copyLink}>Copy Shareable Link</BaseButton></div>}
                        </div>
                        <div className="flex justify-end gap-4">
                            <BaseButton isDisabled={agentFileMutation.isLoading} isLoading={agentFileMutation.isLoading} type="submit" extraClass="min-w-40">Go</BaseButton>
                        </div>
                    </form>
                </div>
                {data && <div className=" p-4 border-2 rounded-lg sm:ml-4 sm:mr-4 flex flex-col gap-10 flex-1 w-full">
                    {
                        data?.map((e: any, number: number) => {
                            if (e.columns) {
                                return <div key={number} className="flex flex-col gap-4 max-w-[100%]">
                                    <div className="flex flex-col gap-4">
                                        {/* <div className="flex gap-4">
                                            <p className="font-semibold">Agent:</p>
                                            <p>{e.agent}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="font-semibold">Task Name:</p>
                                            <p>{e.name.replaceAll('_', ' ').split(' ').map((word: any) =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}</p>
                                        </div> */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <Markdown>
                                                {e.initial}
                                            </Markdown>
                                            <Table aria-label="Stats" className="w-full">
                                                <TableHeader>
                                                    {e.columns.map((f: string, number: number) => <TableColumn key={`${f + number}`}>{f}</TableColumn>)}
                                                </TableHeader>
                                                <TableBody>
                                                    {e.tableData.map((f: any, number: number) => {
                                                        return (
                                                            <TableRow key={number}>
                                                                {f.map((p: any, number: number) => <TableCell key={`${p + number}`}>{p}</TableCell>)}
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                            <Markdown className={'w-full'}>
                                                {e.forecast}
                                            </Markdown>
                                            {/* <Markdown>{e.note[0]}</Markdown> */}
                                        </div>
                                    </div>
                                </div>
                            }
                            return <div key={number} className="flex flex-col shadow-lg p-4 rounded-lg gap-4">
                                <div className="flex flex-col gap-4">
                                    
                                    <div className="flex flex-col gap-4">
                                        <Markdown>{e.raw}</Markdown>
                                    </div>
                                </div>
                            </div>
                        }

                        )
                    }
                </div>}
            </div>

        </>
    )
}