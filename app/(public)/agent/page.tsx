'use client'
import BaseButton from "@/components/common/base-button";
import BaseFile from "@/components/form/base-file";
import BaseTextArea from "@/components/form/base-textarea";
import { navContext } from "@/providers/nav-provider";
import { axiosInstance } from "@/utils/instance";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { FieldValues, useController, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Markdown from 'react-markdown'

const agents = [
    {
        imgSrc: "/agents/seo.svg", agentText: "SEO Search Agent", info: "Searches the web for relevant keywords for SEO and advertising strategies."
    },
    {
        imgSrc: "/agents/vehicle.svg", agentText: "Vehicle Data Agent", info: "Find vehicle information based on VIN/Chassis input or manual selection and returns a comprehensive report based on specifications and internet search."
    },
    {
        imgSrc: "/agents/competitor.svg", agentText: "Competitor Analysis Agent", info: "Compares products and marketing ideas against insurance customer personas."
    },
    {
        imgSrc: "/agents/risk.svg", agentText: "Emerging Risk Identification Agent", info: "Provided an overview of emerging risks within a specific insurance product area."
    },
    {
        imgSrc: "/agents/chat.svg", agentText: "Chatbot Agent", info: "Engages with potential clients in real time on digital platforms, answering product questions and qualifying leads before handing them to a human agent."
    },
    {
        imgSrc: "/agents/customer.svg", agentText: "Customer Research Agent", info: "Researcher a customer via public information."
    },
    {
        imgSrc: "/agents/consumer.svg", agentText: "Consumer Digital Twin", info: "Compares products and marketing ideas against insurance customer personas."
    },
    {
        imgSrc: "/agents/marketing.svg", agentText: "Marketing Agent", info: "Creates ideas and content for marketing campaigns in the insurance industry."
    }
    ,
    {
        imgSrc: "/agents/policy.svg", agentText: "Policy Word Explainer Agent", info: "Explains cover and exclusions in a simple to understand manner."
    }
]

export default function Home() {
    const { showSideBar, setShowSideBar, agent } = useContext(navContext)
    const [data, setData] = useState<any>()
    const agentMutation = useMutation((data: any) => axiosInstance.post(`/agent/${agent}`, data), {
        onSuccess(data) {
            console.log('data', data)
            if (agent == '0') {
                const newData = data.data.result.tasks_output.map((e: any, number: number) => {
                    if (number == 1) {
                        const opo = e.raw.slice(e.raw.indexOf('|')).split('\n')
                        const note = opo.slice(opo.length - 1)
                        const data = opo.slice(0, opo.length - 1)
                        const tableColumns = data[0].slice(1).split('|')
                        const tableData = data.slice(2, data.length - 1).map((f: any) => f.slice(1).split('|'))

                        return {
                            ...e,
                            tableData,
                            tableColumns,
                            note
                        }
                    }
                    return e
                })
                setData(newData)
                return
            }
            setData(data.data.result.tasks_output)
        },
    })
    console.log('agent', agent)
    console.log('data', data)
    if (!agent) {
        redirect('/')
    }
    const { control, handleSubmit, reset, getValues } = useForm()
    const router = useRouter()
    function agentSubmit(e: FieldValues) {
        Object.entries(e).forEach((f) => {
            if (!f[1]) {
                delete e[f[0]]
            }
        })

        // console.log('values',e)
        agentMutation.mutate(e)
    }

    return (
        <>
            <form onSubmit={handleSubmit(agentSubmit)} className=" flex-1 max-w-[75%] flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 mr-4 mb-4">
                <div className="flex justify-between items-center pb-8 border-b-2 border-main-2">
                    <div className="flex gap-4 items-center font-semibold">
                        <Image src={agents[Number(agent)].imgSrc} alt="agent Icon" width={35} height={35} />
                        {/* <GiHamburgerMenu className="cursor-pointer" onClick={() => setShowSideBar(!showSideBar)} /> */}
                        <p className="text-text-2 font-semibold text-xl">{agents[Number(agent)].agentText}</p>
                    </div>
                </div>
                <p className="text-text-1">{agents[Number(agent)].info}</p>
                {
                    agent == '0' && <div className="flex flex-col gap-4">
                        <BaseTextArea control={control} name="project_description" rules={{ required: "Enter Keywords" }} label="Enter Keywords" labelPlacement="outside" placeholder="Enter Comma Seperated Keywords" minRows={1} />
                        <BaseTextArea control={control} name="customer_domain" rules={{}} label="Enter Website URL (Optional)" labelPlacement="outside" placeholder="Enter Website Url" minRows={1} />
                    </div>
                }
                {
                    agent == '2' && <div className="flex flex-col gap-2">
                        <BaseTextArea minRows={1} control={control} name="competitor1" rules={{ required: "Enter Description" }} label="Enter Competitor Domain 1" labelPlacement="outside" placeholder="Enter Domain " />
                        <BaseTextArea minRows={1} control={control} name="competitor2" rules={{}} label="Enter Competitor Domain 2 (optional)" labelPlacement="outside" placeholder="Enter Domain " />
                    </div>
                }
                {
                    agent == '8' && <div className="flex flex-col gap-4">
                        <BaseFile headerText="Upload Policy Document" showHeader={true} control={control} name="file" rules={{ required: "Select File" }} />
                        <p className="text-text-2 font-semibold">OR</p>
                        <BaseTextArea rules={{ validate: () => getValues().file ? true : "File is already selected" }} control={control} name="question" label="Ask a Question Directly" labelPlacement="outside" placeholder="Type your question or paste text for explanation (e.g., What does 'rider' mean in my policy?)" minRows={1} />
                    </div>
                }
                <div className="flex justify-end gap-4">
                    {/* <BaseButton onClick={()=>{
                        reset({desc:""})
                    }} variant="bordered" extraClass="min-w-40 bg-transparent text-main-1 border-main-1 ">Reset</BaseButton> */}
                    <BaseButton isDisabled={agentMutation.isLoading} isLoading={agentMutation.isLoading} type="submit" extraClass="min-w-40">Go</BaseButton>
                </div>
                <div className=" overflow-auto max-h-[40rem]">
                    {agent == '0' && data && data?.map((e: any, number: number) => {
                        if (number != 1) {
                            return (
                                <div key={number} className="flex flex-col shadow-lg p-4 rounded-lg gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <p className="font-semibold">Agent:</p>
                                            <p>{number == 0 ? "Keyword Insights" : number == 1 ? "Related Keywords" : number == 3 ? "SEO Competitor" : "SEO Recommendation"}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="font-semibold">Task Name:</p>
                                            <p>{e.name}</p>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <Markdown>{e.raw}</Markdown>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return <div key={number} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <p className="font-semibold">Agent:</p>
                                    <p>{number == 1 ? "Related Keywords" : number == 3 ? "SEO Competitor" : "SEO Recommendation"}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">Task Name:</p>
                                    <p>{e.name}</p>
                                </div>
                                <div className="flex flex-col gap-2">

                                    <Table aria-label="Stats">
                                        <TableHeader>
                                            {e.tableColumns.map((f: string) => <TableColumn key={f}>{f}</TableColumn>)}
                                        </TableHeader>
                                        <TableBody>
                                            {e.tableData.map((f: any, number: number) => {
                                                return (
                                                    <TableRow key={number}>
                                                        {f.map((p: any) => <TableCell key={p}>{p}</TableCell>)}
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                    <Markdown>{e.note[0]}</Markdown>
                                </div>
                            </div>
                        </div>
                    }
                    )}
                    {agent == '2' && data?.map((e: any, number: number) =>
                    (
                        <div key={number} className="flex flex-col shadow-lg p-4 rounded-lg gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <p className="font-semibold">Agent:</p>
                                    <p>{number == 0 ? "Competitor Data Retrieval" : number == 1 ? "Market Positioning" : number == 3 ? "Performance Matrix Analysis" : "Competitor Comparison"}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">Task Name:</p>
                                    <p>{e.name.replaceAll('_', ' ')}</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Markdown>{e.raw}</Markdown>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>


            </form>
        </>
    )
}
