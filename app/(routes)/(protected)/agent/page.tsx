'use client'
import BaseButton from "@/components/common/base-button";
import BaseFile from "@/components/form/base-file";
import BaseTextArea from "@/components/form/base-textarea";
import { navContext } from "@/providers/nav-provider";
import { axiosInstance } from "@/utils/instance";
import { Radio, RadioGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { FieldValues, useController, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Markdown from 'react-markdown'
import BaseInput from "@/components/form/base-input";
import BaseAgentInput from "@/components/form/base-input-agent";
import BaseRadioGroup from "@/components/form/base-radio";
import BaseSelect from "@/components/form/base-select";
// jj
const agents = [
    {
        imgSrc: "/agents/seo.svg", agentText: "SEO Search Agent", info: "Searches the web for relevant keywords for SEO and advertising strategies."
    },
    {
        imgSrc: "/agents/marketing.svg", agentText: "Marketing Agent", info: "Creates ideas and content for marketing campaigns in the insurance industry."
    }
    ,
    {
        imgSrc: "/agents/competitor.svg", agentText: "Competitor Analysis Agent", info: "Compares products and marketing ideas against insurance customer personas."
    },
    {
        imgSrc: "/agents/customer.svg", agentText: "Digital Twin Agent", info: "Provide product developers and marketeers at insurance companies with a way of evaluating product ideas or marketing ideas against nine different insurance customer personas."
    },
    {
        imgSrc:"/agents/risk.svg" ,agentText:"User Id Agent", info:"Main function to initialize the IDReaderCrew and process the ID image." 
    },
    {
        imgSrc: "/agents/customer.svg", agentText: "Customer Research Agent", info: "Researcher a customer via public information."
    },
    {
        imgSrc: "/agents/consumer.svg", agentText: "Consumer Digital Twin", info: "Compares products and marketing ideas against insurance customer personas."
    },
    {
        imgSrc: "/agents/vehicle.svg", agentText: "Vehicle Data Agent", info: "Find vehicle information based on VIN/Chassis input or manual selection and returns a comprehensive report based on specifications and internet search."
    }
    ,
    {
        imgSrc: "/agents/policy.svg", agentText: "Policy Word Explainer Agent", info: "Explains cover and exclusions in a simple to understand manner."
    },
    {
        imgSrc: "/agents/sentiment.svg", agentText: "Customer Sentiment", info: "Scrapes the web to find customer sentiments about the company and presents the findings at aggregate level."
    },
    {
        imgSrc: "/agents/chat.svg", agentText: "Personalized Recommendation", info: "Personalized Recommendation Agent assists customer service agents and sales representatives by recommending relevant products based on customer responses and characteristics."
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

                        const opo = e.raw.slice(e.raw.indexOf('|'), e.raw.lastIndexOf('|')).split('\n')
                        const insights = e.raw.slice(e.raw.lastIndexOf('|')+1)
                        const note = opo.slice(opo.length - 1)
                        const data = opo.slice(0, opo.length - 1)
                        const tableColumns = data[0].slice(1).split('|')
                        const tableData = data.slice(2, data.length - 1).map((f:any) => f.slice(1).split('|'))

                        return {
                            ...e,
                            tableData,
                            tableColumns,
                            note,
                            insights
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
    const agentFileMutation=useMutation((data:any)=>axiosInstance.postForm(`/agent/file/${agent}`,data),{
        onSuccess(data, variables, context) {
            console.log('file',data.data)
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
            else if (f[0] == 'company_variations') {
                e[f[0]] = f[1].split(',')
            }
        })

        if (Object.keys(e).includes('characteristics')) {
            const customer_segment = e['customer_segment']
            if (customer_segment == 'Business') {
                Object.entries(e['characteristics']).forEach((m) => {
                    if (m[0] != 'industry' && m[0] != 'risk_concern') {
                        delete e['characteristics'][m[0]]
                    }
                })
            }
            if (customer_segment == 'Specialized') {
                Object.entries(e['characteristics']).forEach((m) => {
                    if (m[0] != 'type_of_entity' && m[0] != 'specific_needs') {
                        delete e['characteristics'][m[0]]
                    }
                })
            }
            if (customer_segment == 'Individual') {
                Object.entries(e['characteristics']).forEach((m) => {
                    if (m[0] != 'type' && m[0] != 'interest') {
                        delete e['characteristics'][m[0]]
                    }
                })
            }
        }


        console.log('values', e)
        if(agent!='4'){
            agentMutation.mutate(e)
            return
        }
        const formData=new FormData()
        // console.log(e.agent[0])
        formData.append('file',e.agent[0])
        agentFileMutation.mutate(formData)


    }

    return (
        <>
            <form onSubmit={handleSubmit(agentSubmit)} className=" flex-1 ml-4 flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 mr-4 mb-4">
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
                        <BaseTextArea minRows={1} control={control} name="geographical_location" rules={{ required: "Enter Geographical Location" }} label="Geographical Location" labelPlacement="outside" placeholder="Enter Geographical Location (e.g. Asia)" />
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
                {
                    agent == '9' && <div className="flex flex-col gap-4">
                        <BaseTextArea minRows={1} control={control} name="company_name" rules={{ required: "Enter Target Insurance Company" }} label="Specify Target Insurance Company" labelPlacement="outside" placeholder="Enter Domain " />
                        <BaseTextArea minRows={1} control={control} name="geographical_location" rules={{ required: "Enter Geographical Location" }} label="Geographical Location" labelPlacement="outside" placeholder="Enter Geographical Location (e.g. Asia)" />
                        <BaseTextArea minRows={1} control={control} name="company_variations" rules={{}} label="Company Variations (optional)" labelPlacement="outside" placeholder="Enter Comma Seperated Company Variations e.g.( Life Insurance Corporation of India, Jubilee Life Insurance Company Limited)" />
                    </div>
                }
                {
                    agent == '10' && <div className="flex flex-col gap-4">
                        <BaseAgentInput name="customer_name" label='Name' labelPlacement="outside" control={control} rules={{ required: "Enter Your Name" }} placeholder="Enter Your Name" />
                        <BaseSelect labelPlacement="outside" placeholder="Select Age Group" control={control} name="age_group" label="Select Age Group" rules={{ required: "Select Age Group" }} data={['20-30', '30-40', '40-50', '50-60', '60-70', '70-80']} />
                        <BaseSelect labelPlacement="outside" placeholder="Select Entity" control={control} name="customer_segment" label="Select Entity" rules={{ required: "Select Entity" }} data={['Individual', 'Business', 'Specialized']} />
                        {getValues().customer_segment == 'Individual' && <>
                            <BaseAgentInput name="characteristics.type" label='Type Of Customer' labelPlacement="outside" control={control} rules={{ required: "Enter Type Of Customer" }} placeholder="Are you a Homeowner, Renter, Vehicle Owner, or Other?" />
                            <BaseAgentInput name="characteristics.interest" label='Type Of Insurance' labelPlacement="outside" control={control} rules={{ required: "Enter Type Of Insurance" }} placeholder="What type of insurance are you looking for (e.g., Property, Life, Health)?" />
                        </>}
                        {getValues().customer_segment == 'Business' && <>
                            <BaseAgentInput name="characteristics.industry" label='Industry' labelPlacement="outside" control={control} rules={{ required: "Enter Industry" }} placeholder="What industry is your business in (e.g., Technology, Manufacturing)?" />
                            <BaseAgentInput name="characteristics.risk_concern" label='Primary Risk' labelPlacement="outside" control={control} rules={{ required: "Enter Primary Risk" }} placeholder="What is the primary risk your business wants to mitigate (e.g., cyber threats, liability)?" />
                        </>}
                        {getValues().customer_segment == 'Specialized' && <>
                            <BaseAgentInput name="characteristics.type_of_entity" label='Type Of Specialized Entity' labelPlacement="outside" control={control} rules={{ required: "Enter Type Of Specialized Entity" }} placeholder="What type of specialized entity are you? (e.g., Airlines, Non-Profit Organization, Educational Institution)?" />
                            <BaseAgentInput name="characteristics.specific_needs" label='Primary Insurance Need' labelPlacement="outside" control={control} rules={{ required: "Enter Primary Insurance Need" }} placeholder="What is the primary insurance need for your entity (e.g., Aviation Insurance, Liability, Health)?" />
                        </>}
                    </div>
                }
                {agent=='4' && <div className="flex flex-col gap-4">
                    <BaseFile headerText="Upload User Id Picture" showHeader={true} control={control} name="agent" rules={{ required: "Select File" }} />
                    </div>}
                {agent == '1' && <div className="flex flex-col gap-4">

                    <BaseTextArea minRows={1} control={control} name="customer_domain" rules={{ required: "Enter Customer Domain" }} label="Customer Domain" labelPlacement="outside" placeholder="e.g., https://www.jubileelife.com/ " />
                    <BaseTextArea minRows={1} control={control} name="geographical_location" rules={{ required: "Enter Geographical Location" }} label="Geographical Location" labelPlacement="outside" placeholder="Enter Geographical Location (e.g. Asia)" />
                    <BaseTextArea minRows={1} control={control} name="project_description" rules={{ required: "Enter Project Description", validate: (value) => ["insurance", "life", "health", "property", "coverage", "policy", "claims"].find((e) => value.toLowerCase().includes(e)) ? true : `The project description must be related to the insurance industry. Please provide a valid insurance-related project which includes any of these keywords ${["insurance", "life", "health", "property", "coverage", "policy", "claims"].join(', ')}.` }} label="Project Description" labelPlacement="outside" placeholder="Enter Project Description" />
                </div>}

                {agent == '3' && <div className="flex flex-col gap-4">
                    <BaseTextArea minRows={1} control={control} name="topic" rules={{ required: "Enter Topic Name" }} label="Topic" labelPlacement="outside" placeholder="Enter Topic Name " />
                    <BaseTextArea minRows={1} control={control} name="name" rules={{ required: "Enter Plan" }} label="Plan" labelPlacement="outside" placeholder="Enter Plan" />
                    <BaseTextArea minRows={1} control={control} name="description" rules={{ required: "Enter Target Insurance Company" }} label="Specify Target Insurance Company" labelPlacement="outside" placeholder="Enter Domain " />
                    <BaseTextArea minRows={1} control={control} name="target_audience" rules={{ required: "Enter Target Audience" }} label="Target Audience" labelPlacement="outside" placeholder="Enter Target Audience" />
                    <BaseTextArea minRows={1} control={control} name="product_marketing_idea" rules={{ required: "Enter Product Marketing Idea" }} label="Product Marketing Idea" labelPlacement="outside" placeholder="Enter Product Marketing Idea" />
                </div>}
                <div className="flex justify-end gap-4">
                    {/* <BaseButton onClick={()=>{
                        reset({desc:""})
                    }} variant="bordered" extraClass="min-w-40 bg-transparent text-main-1 border-main-1 ">Reset</BaseButton> */}
                    <BaseButton isDisabled={agentMutation.isLoading|| agentFileMutation.isLoading} isLoading={agentMutation.isLoading || agentFileMutation.isLoading} type="submit" extraClass="min-w-40">Go</BaseButton>
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
                                            <p>{e.name.replaceAll('_', ' ').split(' ').map((word: any) =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}</p>
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
                                    <p>{e.name.replaceAll('_', ' ').split(' ').map((word: any) =>
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                    ).join(' ')}</p>
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
                                    <Markdown>
                                        {e.insights}
                                    </Markdown>
                                    <Markdown>{e.note[0]}</Markdown>
                                </div>
                            </div>
                        </div>
                    }
                    )}
                    {(agent == '2' || agent == '9' || agent == '1' || agent == '3') && data?.map((e: any, number: number) =>
                    (
                        <div key={number} className="flex flex-col shadow-lg p-4 rounded-lg gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <p className="font-semibold">Agent:</p>
                                    <p>{number == 0 ? "Competitor Data Retrieval" : number == 1 ? "Market Positioning" : number == 3 ? "Performance Matrix Analysis" : "Competitor Comparison"}</p>
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
                    )
                    )}
                    {
                        agent == '10' && data?.map((e: any, number: number) =>
                        (
                            <div key={number} className="flex flex-col shadow-lg p-4 rounded-lg gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <p className="font-semibold">Agent:</p>
                                        <p>{number == 0 ? "Competitor Data Retrieval" : number == 1 ? "Market Positioning" : number == 3 ? "Performance Matrix Analysis" : "Competitor Comparison"}</p>
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
                        )
                        )
                    }
                    {
                        agent=='4' && agentFileMutation.data?.data &&<Markdown>{agentFileMutation.data.data.result.raw}</Markdown>
                    }
                </div>


            </form>
        </>
    )
}
