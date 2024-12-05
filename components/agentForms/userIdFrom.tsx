import Image from "next/image"
import { FieldValues, useForm } from "react-hook-form"
import BaseButton from "../common/base-button"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import Markdown from "react-markdown"
import BaseFile from "../form/base-file"
import { AgentFormInteface } from "@/utils/types"
import Instructions from "../common/instructions"

const penis = `html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Emerging Risks Report</title>
<style>
    body {font-family: Arial, sans-serif; margin: 20px;}
    h1, h2, h3 {color: #333;}
    ul {list-style-type: none; padding: 0;}
    li {margin-bottom: 10px;}
    a {color: #1E90FF; text-decoration: none;}
    a:hover {text-decoration: underline;}
</style>
</head>
<body>
<h1>Emerging Risks Report</h1>
 
<h2>Health Product Line</h2>
<h3>Identified Risks</h3>
<ul>
<li>Infrastructure constraints</li>
<li>Technological risks</li>
<li>Chronic health issues</li>
</ul>
 
<h3>Emerging Trends and Incidents</h3>
<ul>
<li>
        Overcrowded facilities, declining physician-population ratios, limited medicine availability - <a href="https://www.iqvia.com/locations/asia-pacific/library/white-papers/healthcare-in-asia-2023-sustaining-the-step-change" target="_blank">Source</a>
</li>
<li>
        Cyber attacks or data breaches pose significant risks to healthcare organizations - <a href="https://www.aon.com/en/insights/reports/global-risk-management-survey/top-risks-facing-healthcare-organizations" target="_blank">Source</a>
</li>
<li>
        Rising prevalence of chronic diseases and mental health issues - <a href="https://www.riskleadershipnetwork.com/insights/top-10-emerging-risks-of-2023" target="_blank">Source</a>
</li>
<li>
        Climate change impacts threaten health infrastructure, especially in island states - <a href="https://www3.weforum.org/docs/WEF_PHSSR_CAPRI_Asia_Pacific_2024.pdf" target="_blank">Source</a>
</li>
<li>
        Increased healthcare demand pressures governments to enhance investment - <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9986597/" target="_blank">Source</a>
</li>
</ul>
 
<h2>Loan Product Line</h2>
<h3>Identified Risks</h3>
<ul>
<li>Economic slowdown</li>
<li>Liquidity risks</li>
<li>Technological vulnerabilities</li>
</ul>
 
<h3>Emerging Trends and Incidents</h3>
<ul>
<li>
        Economic slowdown, rising inflation create financial instability - <a href="https://www.spglobal.com/ratings/en/research/pdf-articles/221115-asia-pacific-financial-institutions-credit-outlook-2023-downside-risks-endure-101569124" target="_blank">Source</a>
</li>
<li>
        Liquidity risks in the non-banking sector increase with project finance loans - <a href="https://www2.deloitte.com/content/dam/Deloitte/sg/Documents/finance/sea-fa-deleveraging-asia-q2-2023.pdf" target="_blank">Source</a>
</li>
<li>
        Cyber risks and AI misuse in financial services - <a href="https://www.aon.com/en/insights/reports/global-risk-management-survey/top-risks-facing-financial-institutions" target="_blank">Source</a>
</li>
<li>
        Potential default spikes from property sector loans under liquidity stress - <a href="https://www.spglobal.com/_assets/documents/ratings/research/101599997.pdf" target="_blank">Source</a>
</li>
<li>
        Systemic risks from the rapid growth of the private credit sector - <a href="https://www.hkma.gov.hk/media/eng/publication-and-research/research/research-memorandums/2024/RM05-2024.pdf" target="_blank">Source</a>
</li>
</ul>
 
<h2>Summary Section</h2>
<h3>Key Recurring Risks Across Product Lines</h3>
<ul>
<li>Technological vulnerabilities, including cyber risks affecting both healthcare and financial services.</li>
</ul>
 
<h3>Significant Risks Specific to the Specified Area and Product Lines</h3>
<ul>
<li>Healthcare: Increasing pressure on infrastructure and workforce due to overcrowding and rising chronic diseases as well as data breach threats.</li>
<li>Loan: Economic downturns and liquidity difficulties that are potentially exacerbated by fluctuations in the property sector and private credit expansions.</li>
</ul>
</body>
</html>
`


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
                            <BaseFile accept=".jpeg,.jpg,.png" headerText="Upload User ID Picture" showHeader={true} control={control} name="agent" rules={{ required: "Select File" }} />
                        </div>
                        <div className="flex justify-end gap-4">
                            <BaseButton isDisabled={agentFileMutation.isLoading} isLoading={agentFileMutation.isLoading} type="submit" extraClass="min-w-40">Go</BaseButton>
                        </div>
                    </form>
                </div>
                {/* <code dangerouslySetInnerHTML={{__html:penis}}>
                </code> */}
                {/* <Markdown >
                    {penis}
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
