'use client'
import BaseButton from "@/components/common/base-button";
import BaseFile from "@/components/form/base-file";
import BaseTextArea from "@/components/form/base-textarea";
import { navContext } from "@/providers/nav-provider";
import { axiosInstance } from "@/utils/instance";
import { Radio, RadioGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { FieldValues, useController, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Markdown from 'react-markdown'
import BaseInput from "@/components/form/base-input";
import BaseAgentInput from "@/components/form/base-input-agent";
import BaseRadioGroup from "@/components/form/base-radio";
import BaseSelect from "@/components/form/base-select";
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
        imgSrc: "/agents/vehicle.svg", agentText: "Id Reader", info: "Returns the value of an uploaded ID document."
    },
    {
        imgSrc: "/agents/policy.svg", agentText: "Policy Word Explainer", info: "Explains covers and exclusions in a simple to understand manner."
    },
    {
        imgSrc: "/agents/chat.svg", agentText: "Chatbot", info: "Engages with potential clients in real time on digital platforms, answering product questions and qualifying leads before handing them to a human agent."
    },
    {
        imgSrc: "/agents/risk.svg", agentText: "Emerging Risk Identification", info: "Provided an overview of emerging risks within a specific insurance product area."
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
    }
]

export default function Home() {
    const { showSideBar, setShowSideBar, agent } = useContext(navContext)
    console.log('agent', agent)
    if (!agent) {
        redirect('/')
    }
    return (
        <>
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

        </>
    )
}





