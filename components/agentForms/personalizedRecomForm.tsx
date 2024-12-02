import Image from "next/image"
import { FieldValues, useForm } from "react-hook-form"
import BaseButton from "../common/base-button"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import { useState } from "react"
import Markdown from "react-markdown"
import BaseAgentInput from "../form/base-input-agent"
import BaseSelect from "../form/base-select"
import { AgentFormInteface } from "@/utils/types"


export default function PersonalizedRecommendForm({ imgSrc, agentInfo, agentText, agent }: AgentFormInteface) {
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


    return (
        <>
            <form onSubmit={handleSubmit(agentSubmit)} className=" flex-1 ml-4 flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 sm:ml-0 mr-4 ml-4 mb-4">
                <div className="flex justify-between items-center pb-8 border-b-2 border-main-2">
                    <div className="flex gap-4 items-center font-semibold">
                        <Image src={imgSrc} alt="agent Icon" width={35} height={35} />
                        <p className="text-text-2 font-semibold text-xl">{agentText}</p>
                    </div>
                </div>
                <p className="text-text-1">{agentInfo}</p>
                <div className="flex flex-col gap-4">
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
                <div className="flex justify-end gap-4">
                    <BaseButton isDisabled={agentMutation.isLoading } isLoading={agentMutation.isLoading } type="submit" extraClass="min-w-40">Go</BaseButton>
                </div>
                <div className="  flex flex-col gap-10">

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