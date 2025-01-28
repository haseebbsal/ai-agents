'use client'
import { navContext } from "@/providers/nav-provider";
import { redirect } from "next/navigation";
import { use, useContext } from "react";
import SeoAgentForm from "@/components/agentForms/seoAgentForm";
import MarketingForm from "@/components/agentForms/marketingForm";
import DigitalTwinForm from "@/components/agentForms/digitalTwinForm";
import CompetitorAnalysisForm from "@/components/agentForms/competitorAnalysisForm";
import UserIdForm from "@/components/agentForms/userIdFrom";
import CustomerSentimentForm from "@/components/agentForms/customerSentimentForm";
import PersonalizedRecommendForm from "@/components/agentForms/personalizedRecomForm";
import PolicyForm from "@/components/agentForms/policyForm";
import ChatForm from "@/components/agentForms/chatForm";
import EmergingRiskForm from "@/components/agentForms/emergingRiskForm";
import PersonResearchForm from "@/components/agentForms/personResearchForm";
import CustomerReachForm from "@/components/agentForms/customerReach";
import ContractOptimizationForm from "@/components/agentForms/contractOptimizationForm";
import AutomatedBudgetForm from "@/components/agentForms/automatedBudgetForm";
import VirtualAssistantForm from "@/components/agentForms/virtualAssistantForm";
import UserStoriesForm from "@/components/agentForms/userStories";
import ContractSummarizerForm from "@/components/agentForms/contractSummarizer";
import DocumentProcessorForm from "@/components/agentForms/documentProcessor";
import ClaimsProcessingForm from "@/components/agentForms/claimsProcessing";
import OnboardingAgentForm from "@/components/agentForms/onboardingAgentForm";

const agents = [
    {
        imgSrc: "/agents/seo.svg", agentText: "SEO Search", info: "Searches the web for relevant keywords for SEO and advertising strategies."
    },
    {
        imgSrc: "/agents/marketing.svg", agentText: "Marketing", info: "Creates ideas and content for marketing campaigns in the insurance industry."
    }
    ,
    {
        imgSrc: "/agents/competitor.svg", agentText: "Competitor Analysis", info: "Analyzes one or two competitors to understand competitive positioning."
    },
    {
        imgSrc: "/agents/customer.svg", agentText: "Consumer Digital Twin", info: "Compares products and marketing ideas against insurance customer personas."
    },
    {
        imgSrc: "/agents/vehicle.svg", agentText: "ID Reader", info: "Returns the value of an uploaded ID document."
    },
    {
        imgSrc: "/agents/policy.svg", agentText: "Policy Word Explainer", info: "Explains covers and exclusions in a simple to understand manner."
    },
    {
        imgSrc: "/agents/chat.svg", agentText: "Chatbot", info: "Engages with potential clients in real time on digital platforms, answering product questions and qualifying leads before handing them to a human agent."
    },
    {
        imgSrc: "/agents/risk.svg", agentText: "Emerging Risk Identification", info: "“Provides an overview of emergent risks within a specific insurance product area and in a specific part of the world."
    }
    ,
    {
        imgSrc: "/agents/consumer.svg", agentText: "Person Research", info: "Automates the gathering of relevant data from various sources, like public records and social media, to ensure comprehensive risk assessment."
    },
    {
        imgSrc: "/agents/sentiment.svg", agentText: "Customer Sentiment", info: "Analyzes the web to find customer sentiments."
    },
    {
        imgSrc: "/agents/consumer.svg", agentText: "Personalized Recommendation", info: "Suggests policy adjustments or additional coverage options based on input from the customer or agent."
    },
    {
        imgSrc: "/agents/consumer.svg", agentText: "Company Research", info: "Researches a company for deeper understanding."
    },
    {
        imgSrc: "/agents/policy.svg", agentText: "Contract Optimization", info: "Suggests contract optimizations for clarity and ease of reading."
    },
    {
        imgSrc: "/agents/marketing.svg", agentText: "Automated Budget", info: "Assists finance teams in preparing budgets by analyzing past financial data and projecting future trends."
    },
    {
        imgSrc: "/agents/policy.svg", agentText: "Virtual Assistant", info: "Provides 24/7 support to customer service agents, answering policy-related queries and guiding customers through self-service options (based on uploaded insurance policy or claims process)."
    },
    {
        imgSrc: "/agents/sentiment.svg", agentText: "User Story", info: "Writes user stories for agile software development requirements. Interviews the user and returns a software development requirements document."
    },
    {
        imgSrc: "/agents/consumer.svg", agentText: "Contract Summarizer", info: "Summarizes key points from an uploaded contract."
    },
    {
        imgSrc: "/agents/policy.svg", agentText: "Document Processing", info: "Extracts and processes policyholder information from digital documents, reducing administrative workload."
    },
    {
        imgSrc: "/agents/policy.svg", agentText: "Claims Processing", info: "Compares a claim document against a series of preset rules."
    },
    {
        imgSrc: "/agents/customer.svg", agentText: "Onboarding", info: "Guides new employees through the onboarding process, providing resources and answering common questions."
    }
]

const agentIds=['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19']

export default function Home({searchParams}:{searchParams:any}) {
    // const { agent } = useContext(navContext)
    const {agent}:any=use(searchParams)
    if (!agentIds.includes(agent)) {
        redirect('/')
    }

    return (
        <>
            <div className="w-full bg-white flex">
                {agent == '0' && <SeoAgentForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '1' && <MarketingForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '2' && <CompetitorAnalysisForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '3' && <DigitalTwinForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '4' && <UserIdForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '5' && <PolicyForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '6' && <ChatForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '7' && <EmergingRiskForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '8' && <PersonResearchForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '9' && <CustomerSentimentForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '10' && <PersonalizedRecommendForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '11' && <CustomerReachForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '12' && <ContractOptimizationForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '13' && <AutomatedBudgetForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '14' && <VirtualAssistantForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '15' && <UserStoriesForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '16' && <ContractSummarizerForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '17' && <DocumentProcessorForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '18' && <ClaimsProcessingForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
                {agent == '19' && <OnboardingAgentForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
            </div>


        </>
    )
}





