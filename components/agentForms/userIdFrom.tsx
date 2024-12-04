import Image from "next/image"
import { FieldValues, useForm } from "react-hook-form"
import BaseButton from "../common/base-button"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import Markdown from "react-markdown"
import BaseFile from "../form/base-file"
import { AgentFormInteface } from "@/utils/types"
import Instructions from "../common/instructions"


export default function UserIdForm({ imgSrc, agentInfo, agentText, agent }: AgentFormInteface) {
    const { control, handleSubmit, reset, getValues } = useForm()
    const agentFileMutation = useMutation((data: any) => axiosInstance.postForm(`/agent/file/${agent}`, data), {
        onSuccess(data, variables, context) {
            console.log('file', data.data)
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

        const formData = new FormData()
        formData.append('file', e.agent[0])
        agentFileMutation.mutate(formData)
    }

    return (
        <>

            <div className="flex flex-1 flex-wrap flex-col gap-4 w-full sm:p-0 p-4 ">
                <div className="flex flex-1 flex-wrap gap-4 w-full sm:p-0 p-4">
                    <Instructions />

                    <form onSubmit={handleSubmit(agentSubmit)} className=" flex-1 flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 sm:mr-4 mb-4">
                        <div className="flex justify-between items-center pb-8 border-b-2 border-main-2">
                            <div className="flex gap-4 items-center font-semibold">
                                <Image src={imgSrc} alt="agent Icon" width={35} height={35} />
                                <p className="text-text-2 font-semibold text-xl">{agentText}</p>
                            </div>
                        </div>
                        <p className="text-text-1">{agentInfo}</p>
                        <div className="flex flex-col gap-4">
                            <BaseFile accept=".jpeg,.jpg,.png" headerText="Upload User Id Picture" showHeader={true} control={control} name="agent" rules={{ required: "Select File" }} />
                        </div>
                        <div className="flex justify-end gap-4">
                            <BaseButton isDisabled={agentFileMutation.isLoading} isLoading={agentFileMutation.isLoading} type="submit" extraClass="min-w-40">Go</BaseButton>
                        </div>
                    </form>
                </div>
                {/* <Markdown>
                    **Health Product Line:**

                    - **Identified Risks:**
                    - *Predefined Risks:*
                    - Infectious diseases
                    - Chronic diseases
                    - Mental health issues
                    - Environmental pollution

                    - *Emerging Trends or Incidents:*
                    - **Emerging infectious diseases:** Southeast Asia is facing new and drug-resistant diseases such as malaria. [Source](https://www.usaid.gov/asia-regional/global-health)
                    - **Noncommunicable diseases:** There's an increase in cardiovascular diseases, cancer, diabetes, and obesity. [Source](https://www.who.int/southeastasia/health-topics/noncommunicable-diseases)
                    - **Climate change impacts:** Extreme weather events such as floods and storms are impacting health. [Source](https://wmo.int/news/media-centre/climate-change-and-extreme-weather-impacts-hit-asia-hard)
                    - **Zoonotic viral diseases:** These diseases are emerging and resurging in Southeast Asia, driven by environmental and human factors. [Source](https://pmc.ncbi.nlm.nih.gov/articles/PMC10298164/)

                    **Loan Product Line:**

                    - **Identified Risks:**
                    - *Predefined Risks:*
                    - Credit risk
                    - Interest rate risk
                    - Liquidity risk
                    - Regulatory risk

                    - *Emerging Trends or Incidents:*
                    - **Economic slowdown and inflation:** These factors are increasing the credit risk in the Asia-Pacific financial sector. [Source](https://www.spglobal.com/ratings/en/research/pdf-articles/221115-asia-pacific-financial-institutions-credit-outlook-2023-downside-risks-endure-101569124)
                    - **Technological innovation:** The integration of decentralized finance with traditional finance increases risks. [Source](https://www.fsb.org/2024/10/fsb-asia-group-discusses-technological-innovation-emerging-risks-and-resolution-regimes/)
                    - **Regulatory pressure:** Banks are facing increased pressure to manage risk within stringent regulatory frameworks. [Source](https://www2.deloitte.com/content/dam/Deloitte/sg/Documents/finance/sea-fa-deleveraging-asia-q2-2023.pdf)
                    - **Geopolitical tensions:** Emerging frictions are due to a shift towards a multipolar geopolitical order. [Source](https://www2.deloitte.com/content/dam/Deloitte/jp/Documents/financial-services/bk/acrs-2023-regulatory-outlook-.pdf)

                    ---

                    **Key Risks Summary:**

                    - Across all product lines, the most critical risks involve **emerging health threats** such as new and drug-resistant diseases, and **economic threats**, including inflation and geopolitical tensions within the financial sector.

                    - Specific to Southeast Asia, the **emergence of infectious and zoonotic diseases** poses significant health risks, while the **Asia-Pacific financial sector is vulnerable due to economic slowdown and regulatory pressures.**

                    This report provides an actionable overview of the critical risks currently affecting each product line, emphasizing the necessity for strategic planning and risk management in response to these identified challenges.
                </Markdown> */}
                {agentFileMutation.data?.data && <div className=" p-4 border-2 rounded-lg sm:ml-4 sm:mr-4 flex-1">

                    {
                        <Markdown>{agentFileMutation.data.data.result.raw}</Markdown>
                    }
                </div>}

            </div>


        </>
    )
}
