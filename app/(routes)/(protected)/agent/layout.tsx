'use client';

import { navContext } from "@/providers/nav-provider";
import { usePathname } from "next/navigation";
import { ReactNode, useContext } from "react";

const instructions = [
    [
        `Enter the website URL or product/service keywords for which you want to optimize SEO.
Optionally, input the geographical location to tailor the analysis to a specific region.
Initiate SEO Analysis`,
        `Click the Analyze button to start the SEO analysis.
View Keyword Insights and Trends`,
        `Click the Analyze button to start the SEO analysis.
View Keyword Insights and Trends`,
        `The agent will analyze relevant keywords, SEO trends, and popular search terms in the insurance industry.
Insights will reflect insurance-specific jargon and current market demands.
Review Competitor Analysis`,
        `View the company's competitive SEO standing and comparisons with other companies for the same keywords.
Receive Recommendations`,
        `Get actionable recommendations for keyword usage and SEO improvements tailored to your website or campaign goals.
Apply Suggestions`,
        `Use the recommendations to refine your SEO strategy, improve keyword usage, or enhance campaign targeting.`
    ]
    ,

    [
        `Provide Input: Enter campaign details, target audience, or geographical location for tailored results.`,
        `Generate Insights: Click Start to receive actionable marketing recommendations and insights.`,
        `Review Results: Access comprehensive and structured outputs for immediate use.`
    ],
    [
        `Enter Competitor Names: Provide the names of one or two insurance companies in the input field.`,
        `Run Analysis: Click the "Analyze Competitors" button.`,
        `Review Results: View the structured comparison of competitors, including metrics, strengths, weaknesses, and market positioning.  `
    ],
    [
        `Enter your product or marketing idea in the text input field.
Optionally, specify the geographical area for more targeted feedback.
Run Evaluation:`,
        `Click the "Evaluate" button to submit your idea for analysis.
The agent will assess the input using nine distinct insurance customer personas.
View Feedback:`,
        `Review the structured feedback, which includes:
Positive aspects.
Areas for improvement.
Persona-specific insights.`
    ],
    [
        `Upload ID Image: Select and upload an image of the ID document.`,
        `Process Image: The agent will automatically process the uploaded image and extract key fields.`,
        `View Extracted Data: Review the structured output showing the extracted fields (e.g., Name, Date of Birth, ID Number).`,
        `Download/Copy Data: Save or copy the extracted data for further use.`,
        `Retry if Needed: If any errors occur, re-upload the image or contact support`
    ],
    [
        `Upload Document: Click the Upload button to add your policy document for analysis (PDF or text file).`,
        `Ask Questions: Use the chatbot to type specific questions about policy terms, phrases, or clauses.`,
        `Simplified Explanations: Receive clear, easy-to-understand responses to your questions or document sections.`
    ],
    [
        `Select and upload the document you want to reference (e.g., policy wordings, claims process documents).
Interact with the Chatbot:`,
        `After the document is uploaded, access the chat interface.
Ask specific questions or initiate a conversation related to the uploaded document's content.
Receive Answers:`,
        `The chatbot will provide responses based on the content of the uploaded document.`,
        `It supports questions about terms, clauses, and general document-related inquiries`
    ],
    [
        `Enter Geographical Location: Type the region or country you want to analyze (e.g., "Asia" or "United States").`,
        `Enter Product Lines: Input relevant insurance product lines separated by commas (e.g., "Health Insurance, Property Insurance").`,
        `Click the 'Go' Button: Press "Go" to generate an analysis of emerging risks for the selected region and product lines.`,

    ],
    [
        `Input the name of the person you want to research (e.g., "John Doe") or provide a direct social media link (e.g., Facebook, LinkedIn).
Click the 'Search' Button:`,
        `Press the "Search" button to initiate the agent's public information search.
View the Report:`,
        `Review the structured, comprehensive report generated by the agent, containing detailed findings from public sources.
Use the Report:`,
        `Use the insights for underwriting, claims evaluation, or other decision-making purposes.`

    ],
    [
        `Enter Company Details: Provide the company name, web link, and any variations.`,
        `Specify Geographical Location (Optional): Input the region or location for a more targeted analysis.`,
        `Run Sentiment Analysis: Click to initiate the agent’s search across public internet sources and social media platforms.`,
        `Review Sentiment Report: View the categorized summary of customer sentiment (positive, neutral, negative).`
    ],
    [
        `Start Interaction: Open the chat interface to begin the process.`,
        `Input Customer Details: Enter customer characteristics, preferences, or respond to guided questions in the chat.`,
        `Analyze Inputs: The agent uses a predefined recommendation matrix to evaluate the customer’s needs based on your inputs.`,
        `Receive Recommendations: View a list of tailored insurance products relevant to the customer’s profile in the output window.`
    ],
    [
        `Type the name of the company you want to research into the input field.
Initiate Search`,
        `Click the Search button to start the agent's data collection process.
Review the Generated Report`,
        `
The agent will compile and display a structured report containing:
Company background.
Financial insights.
Market position.
Risk factors.
Use Report for Decision-Making`,
        `Utilize the insights for sales strategies or underwriting risk assessment.`
    ],
    [
        `Upload Contract: Click the "Upload" button and select the contract (e.g., medical provider agreement or vehicle repair workshop contract) for analysis.`,
        `Initiate Analysis: Once the document is uploaded, the agent will process the contract to identify and interpret key terms, conditions, and provisions.`,
        `Optimization Suggestions:

The agent will analyze the contract against predefined industry standards and best practices.
View the output, which includes:
Areas requiring improvement.
Missing or suboptimal clauses.
Recommendations for enhancements to align the contract with industry norms.
Review and Implement: Use the suggested improvements as a reference for renegotiation or internal review.`
    ],
    [
        `Upload CSV: Select and upload a 12-month budget or actuals CSV file.`,
        `Enter Region: Specify the region or country for the forecast.`,
        `Analyze & Forecast: The agent will process the data, analyze trends, and generate a revised forecast.`,
        `View Results: Review the tabular summary, trends, and updated 12-month forecast.`,
        `Save Output: Copy or download the results for your planning.`
    ],

    [
        `Click the Upload button and select the document (e.g., policy wordings, claims process document) you want to reference.
Interact with the Chatbot`,
        `Ask questions or start a conversation about the uploaded document using the chatbot interface.
Receive Contextual Answers`,
        `The chatbot will provide answers or engage in discussions based on the content of the uploaded document.
Clarify Procedures or Terms`,
        `Use the chatbot to clarify specific terms, clauses, or procedures mentioned in the document.`

    ],

    [
        `Respond to Questions: Answer the predefined questions verbally. The agent will guide you through gathering requirements for up to two or three functionalities per session.`,
        `Review Generated User Stories: The agent will generate Agile user stories in the format: "As a [user], I want [function] so that [benefit]."`
    ],

    [
        `Upload Contract: Click the "Upload" button to select and upload the insurance contract document you want summarized.`,
        `Initiate Summarization: Once the document is uploaded, the agent will begin analyzing and parsing the contract content.`,
        `Review Summary: View the generated summary, which highlights key sections such as:

Coverage details
Exclusions
Obligations
Key terms and conditions`
    ],
    [
     `Click "Upload Document" and select the file you want to translate and analyze.`,
`The system will automatically detect the document language and translate it to English if necessary.`,
`The system will read and interpret the document content to identify key points and relevant information.`,
 `The system will categorize the document into a predefined insurance-related category.`,
 `View the content analysis report highlighting key points and relevant information.`
    ],
    [
        `Click "Upload Document" and select the relevant file from your computer.`,
        `The system will read and categorize the document content. Review the results on the "Document Review" page.`,
        `The system will check the document against predefined rules. View the compliance report on the "Report" page.`
    ],
    
    [
        `Click "Upload Document" and select the Employee Handbook or HR Policy Manual.`,
        `The system will parse and process the document, extracting key policies and information.`,
        `After processing, the system will generate a unique chatbot link.`,
        `Share the link with new employees via email or other communication channels.`,
        `New employees click the shared link to access the chatbot.`,
        `Employees ask questions, and the chatbot responds based on the Employee Handbook or HR Policy Manual.`,
        `Employees receive accurate and helpful responses to their questions.`
    ],
]

export default function AgentLayout({ children }: { children: ReactNode }) {
    const { agent, showInstructions } = useContext(navContext)
    const pathname = usePathname()
    return (
        <div className="flex flex-1 flex-wrap gap-4 w-full sm:p-0 p-4">
            {
                !pathname.includes('onboarding') && showInstructions &&
                <div className="p-4 flex flex-col gap-4 mt-4 border-2 rounded-lg mb-4 sm:ml-4 sm:flex-[0.35_0_0] flex-1 sm:mr-0 ">
                    <p className="font-semibold text-center text-xl">Instructions</p>
                    <ul className="flex flex-col gap-4 p-4">
                        {instructions[Number(agent)]?.map((e: any) =>
                            <li className="list-disc">{e}</li>
                        )}
                    </ul>
                    {/* <p>{instructions[Number(agent)]}</p> */}
                </div>
            }

            {children}
        </div>
    )
}