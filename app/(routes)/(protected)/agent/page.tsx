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
// jj
const agents = [
    {
        imgSrc: "/agents/seo.svg", agentText: "SEO Search", info: "Searches the web for relevant keywords for SEO and advertising strategies."
    },
    {
        imgSrc: "/agents/marketing.svg", agentText: "Marketing", info: "Creates ideas and content for marketing campaigns in the insurance industry."
    }
    ,
    {
        imgSrc: "/agents/competitor.svg", agentText: "Competitor Analysis", info: "Compares products and marketing ideas against insurance customer personas."
    },
    {
        imgSrc: "/agents/customer.svg", agentText: "Digital Twin ", info: "Provide product developers and marketeers at insurance companies with a way of evaluating product ideas or marketing ideas against nine different insurance customer personas."
    },
    {
        imgSrc: "/agents/risk.svg", agentText: "User Id ", info: "Main function to process the ID image."
    },
    {
        imgSrc: "/agents/policy.svg", agentText: "Policy Word Explainer", info: "Explains cover and exclusions in a simple to understand manner."
    },
    {
        imgSrc:"/agents/chat.svg", agentText:"Chat", info:"Engages with potential clients in real time on digital platforms, answering product questions and qualifying leads before handing them to a human agent"
    },
    {
        imgSrc: "/agents/vehicle.svg", agentText: "Vehicle Data", info: "Find vehicle information based on VIN/Chassis input or manual selection and returns a comprehensive report based on specifications and internet search."
    }
    ,
    {
        imgSrc: "/agents/policy.svg", agentText: "Policy Word Explainer", info: "Explains cover and exclusions in a simple to understand manner."
    },
    {
        imgSrc: "/agents/sentiment.svg", agentText: "Customer Sentiment", info: "Scrapes the web to find customer sentiments about the company and presents the findings at aggregate level."
    },
    {
        imgSrc: "/agents/consumer.svg", agentText: "Personalized Recommendation", info: "Personalized Recommendation Agent assists customer service agents and sales representatives by recommending relevant products based on customer responses and characteristics."
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
            {agent=='1' && <MarketingForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
            {agent=='2' && <CompetitorAnalysisForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
            {agent=='3' && <DigitalTwinForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
            {agent=='4' && <UserIdForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
            {agent=='5' && <PolicyForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
            {agent=='6' && <ChatForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
            {agent=='9' && <CustomerSentimentForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
            {agent=='10' && <PersonalizedRecommendForm imgSrc={agents[Number(agent)].imgSrc} agent={agent} agentInfo={agents[Number(agent)].info} agentText={agents[Number(agent)].agentText} />}
        </>
    )
}





