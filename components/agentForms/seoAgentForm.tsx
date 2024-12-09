import Image from "next/image"
import { FieldValues, useForm } from "react-hook-form"
import BaseTextArea from "../form/base-textarea"
import BaseButton from "../common/base-button"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import { useState } from "react"
import Markdown from "react-markdown"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { AgentFormInteface } from "@/utils/types"
import Instructions from "../common/instructions"

const content=`Results:
# Persona-Specific Feedback

### Jordan Miller
- *Reaction*: Interested due to alignment with a tech-savvy, career-driven lifestyle. Seeks digital integration with personalized workout plans and progress tracking.
- *Price Sensitivity*: Budget-conscious; prefers competitively priced subscription models with optional premiums.
- *Marketing Concept*: Use digital platforms; emphasize flexibility, home workouts, and local cultural elements. Partner with influencers.
- *Specific Example*: Solves maintaining active lifestyle without compromising work.
- *Actionable Suggestions*: Offer trial periods, leverage social media engagement, utilize targeted ads.

### Emily and Michael Thompson
- *Reaction*: Sees the value in maintaining a healthy lifestyle. Prefers affordable and convenient fitness solutions adaptable to family life.
- *Price Sensitivity*: Budget-focused; seeks affordable options.
- *Marketing Concept*: Emphasize family-friendly routines, home-based solutions, and busy lifestyle compatibility.
- *Specific Example*: Integrates family workouts to improve health and bonding.
- *Actionable Suggestions*: Provide free trials, use local language, partner with healthcare professionals for credibility.

### Linda and Robert Johnson
- *Reaction*: Favorable; aligns with maintaining mobility and health in retirement. Prefers straightforward guidance.
- *Price Sensitivity*: Seeks affordable, value-packed options.
- *Marketing Concept*: Highlight simplicity and adaptability; use testimonials from similar demographics.
- *Specific Example*: Addresses physical inactivity while avoiding gym commutes.
- *Actionable Suggestions*: Provide senior-friendly content with healthcare advice and multilingual support.

### Sarah Martinez
- *Reaction*: Welcomes home-based, structured fitness that fits a creative lifestyle.
- *Price Sensitivity*: Budget-conscious; prefers competitive pricing.
- *Marketing Concept*: Emphasize time-efficiency, home-based workouts, and adaptability.
- *Specific Example*: Maintains fitness amidst freelance work-from-home setup.
- *Actionable Suggestions*: Highlight privacy commitment, integrate cultural elements in marketing.

### Alex and Taylor Morgan
- *Reaction*: Positive; aligns with newlyweds’ busy and budget-conscious lifestyle.
- *Price Sensitivity*: Price-conscious; prefers moderate pricing with occasional discounts.
- *Marketing Concept*: Focus on convenience and inclusivity; consider family planning needs.
- *Specific Example*: Provides structured health routines for busy schedules.
- *Actionable Suggestions*: Bilingual support, localized content, community-based engagement.

### Mia Chen
- *Reaction*: Fits well with tech-savvy, young professional lifestyle.
- *Price Sensitivity*: Cost-sensitive; values affordability with perceived benefits.
- *Marketing Concept*: Leverage social media and influencers; emphasize digital-first approach.
- *Specific Example*: Solves scheduling conflicts with accessible quick workouts.
- *Actionable Suggestions*: Use mobile-first strategies, bilingual communication, and emphasize digital security.

### Daniel Nguyen
- *Reaction*: Positive; complements a young professional's life with manageable short-term fitness commitments.
- *Price Sensitivity*: Seeks competitively priced solutions.
- *Marketing Concept*: Highlight flexibility and remote accessibility.
- *Specific Example*: Offers continuity across travel-heavy schedule.
- *Actionable Suggestions*: Integrate gaming elements, localized payment solutions, and young professional testimonials.

### Alex Rodriguez
- *Reaction*: Suitable for a high-income, frequent travel lifestyle; values flexibility.
- *Price Sensitivity*: Perceived value is key; premium features justified.
- *Marketing Concept*: Use travel and business platforms; emphasize time efficiency, location adaptability.
- *Specific Example*: Main`
export default function SeoAgentForm({ imgSrc, agentInfo, agentText, agent }: AgentFormInteface) {
    const { control, handleSubmit, reset, getValues } = useForm()
    const [data, setData] = useState<any>()
    const agentMutation = useMutation((data: any) => axiosInstance.post(`/agent/${agent}`, data), {
        onSuccess(data) {
            console.log('data', data)

            const newData = data.data.result.tasks_output.map((e: any, number: number) => {
                if (number == 1 && e.raw.includes('|')) {

                    const opo = e.raw.slice(e.raw.indexOf('|'), e.raw.lastIndexOf('|')+1).split('\n')
                    const insights = e.raw.slice(e.raw.lastIndexOf('|') + 1)
                    // const note = opo.slice(opo.length - 1)
                    const data = opo.slice(0)
                    const tableColumns = data[0].slice(1).split('|')
                    const tableData = data.slice(2).map((f: any) => f.slice(1).split('|'))

                    return {
                        ...e,
                        tableData,
                        tableColumns,
                        // note,
                        insights
                    }
                }
                return e
            })
            setData(newData)
            return

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


    console.log('checkkk',data)

    return (
        <>
            <div className="flex flex-1 flex-wrap flex-col gap-4 w-full sm:p-0 p-4 ">
                <div className="flex flex-1 flex-wrap gap-4 w-full sm:p-0 p-4">
                    <Instructions />
                    <form onSubmit={handleSubmit(agentSubmit)} className=" flex-1  flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 sm:mr-4  mb-4">
                        <div className="flex justify-between items-center pb-8 border-b-2 border-main-2">
                            <div className="flex gap-4 items-center font-semibold">
                                <Image src={imgSrc} alt="agent Icon" width={35} height={35} />
                                <p className="text-text-2 font-semibold text-xl">{agentText}</p>
                            </div>
                        </div>
                        <p className="text-text-1">{agentInfo}</p>
                        <div className="flex flex-col gap-4">
                            <BaseTextArea control={control} name="project_description" rules={{ required: "Enter Keywords" }} label="Enter Keywords" labelPlacement="outside" placeholder="Enter Comma Seperated Keywords" minRows={1} />
                            <BaseTextArea minRows={1} control={control} name="geographical_location" rules={{ required: "Enter Geographical Location" }} label="Geographical Location" labelPlacement="outside" placeholder="Enter Geographical Location (e.g. Asia)" />
                            <BaseTextArea control={control} name="customer_domain" rules={{}} label="Enter Website URL (Optional)" labelPlacement="outside" placeholder="Enter Website Url" minRows={1} />
                        </div>
                        <div className="flex justify-end gap-4">
                            <BaseButton isDisabled={agentMutation.isLoading} isLoading={agentMutation.isLoading} type="submit" extraClass="min-w-40">Go</BaseButton>
                        </div>
                    </form>
                </div>
               
                {data && <div className=" p-4 border-2 rounded-lg sm:ml-4 sm:mr-4 flex flex-col w-full gap-10 ">
                    {
                        data?.map((e: any, number: number) => {
                            if (number != 1) {
                                return (
                                    <div key={number} className="flex flex-col shadow-lg p-4 rounded-lg gap-4">
                                        <div className="flex flex-col gap-4">
                                            {/* <div className="flex gap-4">
                                                <p className="font-semibold">Agent:</p>
                                                <p>{number == 0 ? "Keyword Insights" : number == 1 ? "Related Keywords" : number == 3 ? "SEO Competitor" : "SEO Recommendation"}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <p className="font-semibold">Task Name:</p>
                                                <p>{e.name.replaceAll('_', ' ').split(' ').map((word: any) =>
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                                ).join(' ')}</p>
                                            </div> */}
                                            <div className="flex flex-col gap-4">
                                                <Markdown>{e.raw}</Markdown>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return <div key={number} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    {/* <div className="flex gap-4">
                                        <p className="font-semibold">Agent:</p>
                                        <p>{number == 1 ? "Related Keywords" : number == 3 ? "SEO Competitor" : "SEO Recommendation"}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <p className="font-semibold">Task Name:</p>
                                        <p>{e.name.replaceAll('_', ' ').split(' ').map((word: any) =>
                                            word.charAt(0).toUpperCase() + word.slice(1)
                                        ).join(' ')}</p>
                                    </div> */}
                                    <div className="flex flex-col gap-2">

                                        <Table aria-label="Stats">
                                            <TableHeader>
                                                {e.tableColumns.map((f: string) => <TableColumn key={f}><Markdown>{f}</Markdown></TableColumn>)}
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
                                        {/* <Markdown>{e.note[0]}</Markdown> */}
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