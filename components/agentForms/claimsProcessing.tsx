import Image from "next/image"
import { FieldValues, useForm } from "react-hook-form"
import BaseButton from "../common/base-button"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import Markdown from "react-markdown"
import BaseFile from "../form/base-file"
import { AgentFormInteface } from "@/utils/types"
import BaseTextArea from "../form/base-textarea"
import { useState } from "react"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { CSVLink, CSVDownload } from "react-csv";

export default function ClaimsProcessingForm({ imgSrc, agentInfo, agentText, agent }: AgentFormInteface) {
    const { control, handleSubmit, reset, getValues } = useForm()
    const [data, setData] = useState<any>()
    const agentFileMutation = useMutation((data: any) => axiosInstance.postForm(`/agent/file/${agent}`, data), {
        onSuccess(data, variables, context) {
            console.log('file', data.data)
            const newData = data.data.result.tasks_output.map((k: any, number: number) => {


                if (k.raw.includes('|')) {
                    let afterCsv = k.raw.split('\n')
                    const startIndex = afterCsv.findIndex((e: any) => e.includes('|'))
                    const endIndex = afterCsv.findLastIndex((e: any) => e.includes('|'))
                    let initial = afterCsv.slice(0, startIndex).join('\n')
                    let forecast = afterCsv.slice(endIndex + 1).join('\n')


                    // let beforeTableStart=afterCsv.slice(0,startIndex).join('\n')
                    // let afterTableFinish=afterCsv.slice(endIndex+1).join('\n')
                    const splittedData = afterCsv.slice(startIndex, endIndex)
                    console.log('splitted',splittedData)
                    const columns = splittedData[0].split('|')
                    const removeColumn = splittedData.slice(1)
                    // const indexToSplitTableData=removeColumn.findIndex((e:any)=>!e.includes('-'))
                    const tableData = removeColumn.slice(1).map((e: any) => e.split('|'))

                    return {
                        ...k,
                        columns,
                        tableData,
                        forecast,
                        initial
                    }
                }

                return k


            })
            setData(newData)
        },
    })
    console.log(data)
    function agentSubmit(e: FieldValues) {
        const formData = new FormData()
        formData.append('file', e.agent[0])
        formData.append('file2', e.file2[0])
        agentFileMutation.mutate(formData)
    }

    return (
        <>
            <form onSubmit={handleSubmit(agentSubmit)} className=" flex-1 ml-4 flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 mr-4 sm:ml-0 mr-4 ml-4 mb-4">
                <div className="flex justify-between items-center pb-8 border-b-2 border-main-2">
                    <div className="flex gap-4 items-center font-semibold">
                        <Image src={imgSrc} alt="agent Icon" width={35} height={35} />
                        <p className="text-text-2 font-semibold text-xl">{agentText}</p>
                    </div>
                </div>
                <p className="text-text-1">{agentInfo}</p>
                <div className="flex flex-col gap-4">
                    <BaseFile accept=".pdf" headerText="Upload Rules Document" showHeader={true} control={control} name="agent" rules={{ required: "Select File" }} />
                    <BaseFile accept=".pdf" headerText="Upload Claims Document" showHeader={true} control={control} name="file2" rules={{ required: "Select File" }} />
                </div>
                <div className="flex justify-end gap-4">
                    <BaseButton isDisabled={agentFileMutation.isLoading} isLoading={agentFileMutation.isLoading} type="submit" extraClass="min-w-40">Go</BaseButton>
                </div>
                <div className="  flex flex-col gap-8 w-full">
                    {
                        data?.map((e: any, number: number) => {
                            if (e.columns) {
                                return <div key={number} className="flex flex-col gap-4 max-w-[100%]">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <p className="font-semibold">Agent:</p>
                                            <p>{e.agent}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="font-semibold">Task Name:</p>
                                            <p>{e.name.replaceAll('_', ' ').split(' ').map((word: any) =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}</p>
                                        </div>
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
                                <div className="flex gap-4">
                                    <p className="font-semibold">Agent:</p>
                                    <p>{e.agent}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">Task Name:</p>
                                    <p>{e.name.replaceAll('_', ' ').split(' ').map((word: any) =>
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                    ).join(' ')}</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Markdown>{e.raw}</Markdown>
                                </div>
                            </div>
                        </div>
                        }

                        )
                    }
                </div>
            </form>
        </>
    )
}