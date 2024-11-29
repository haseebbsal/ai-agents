import Image from "next/image"
import { FieldValues, useForm } from "react-hook-form"
import BaseTextArea from "../form/base-textarea"
import BaseButton from "../common/base-button"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import { useState } from "react"
import Markdown from "react-markdown"
import { AgentFormInteface } from "@/utils/types"

export default function DigitalTwinForm({ imgSrc, agentInfo, agentText, agent }: AgentFormInteface) {
    const { control, handleSubmit, reset, getValues } = useForm()
    const [data, setData] = useState<any>()
    const agentMutation = useMutation((data: any) => axiosInstance.post(`/agent/${agent}`, data), {
        onSuccess(data) {
            console.log('data', data)
            setData(data.data.result.tasks_output)
        },
    })

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
        agentMutation.mutate(e)
    }

    console.log('data',data)


    return (
        <>
            <form onSubmit={handleSubmit(agentSubmit)} className=" flex-1 ml-4 flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4  mb-4">
                <div className="flex justify-between items-center pb-8 border-b-2 border-main-2">
                    <div className="flex gap-4 items-center font-semibold">
                        <Image src={imgSrc} alt="agent Icon" width={35} height={35} />
                        <p className="text-text-2 font-semibold text-xl">{agentText}</p>
                    </div>
                </div>
                <p className="text-text-1">{agentInfo}</p>
                <div className="flex flex-col gap-4">
                    {/* <BaseTextArea minRows={1} control={control} name="topic" rules={{ required: "Enter Topic Name" }} label="Topic" labelPlacement="outside" placeholder="Enter Topic Name " />
                    <BaseTextArea minRows={1} control={control} name="name" rules={{ required: "Enter Plan" }} label="Plan" labelPlacement="outside" placeholder="Enter Plan" />
                    <BaseTextArea minRows={1} control={control} name="description" rules={{ required: "Enter Target Insurance Company" }} label="Specify Target Insurance Company" labelPlacement="outside" placeholder="Enter Domain " />
                    <BaseTextArea minRows={1} control={control} name="target_audience" rules={{ required: "Enter Target Audience" }} label="Target Audience" labelPlacement="outside" placeholder="Enter Target Audience" /> */}
                    <BaseTextArea minRows={1} control={control} name="area" rules={{ required: "Enter Geographical Location" }} label="Geographical Location" labelPlacement="outside" placeholder="Enter Geographical Location (e.g. Asia)" />
                    <BaseTextArea minRows={1} control={control} name="product_marketing_idea" rules={{ required: "Enter Product Marketing Idea" }} label="Product Marketing Idea" labelPlacement="outside" placeholder="Enter Product Marketing Idea" />
                </div>
                <div className="flex justify-end gap-4">
                    <BaseButton isDisabled={agentMutation.isLoading} isLoading={agentMutation.isLoading} type="submit" extraClass="min-w-40">Go</BaseButton>
                </div>
                <div className=" overflow-auto max-h-[40rem] flex flex-col gap-10">

                    {
                        data?.map((e: any, number: number) =>
                        (
                            <div key={number} className="flex flex-col shadow-lg p-4 rounded-lg gap-4">
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
                        )
                        )
                    }
                </div>
            </form>
        </>
    )
}