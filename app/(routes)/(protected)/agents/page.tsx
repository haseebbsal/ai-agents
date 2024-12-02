'use client'
import BaseAgent from "@/components/common/base-agent";
import { navContext } from "@/providers/nav-provider";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { SlOptionsVertical } from "react-icons/sl";

const agentsData = [
    {
        bgColor:"bg-[#eeeeef]",
        categorization: "Underwriting",
        data: [
            {
                imgSrc: "/agents/risk.svg", agentText: "Emerging Risk Identification", info: "Provided an overview of emerging risks within a specific insurance product area.", agentId: '7'
            },
            {
                imgSrc: "/agents/customer.svg", agentText: "Consumer Digital Twin", info: "Compares products and marketing ideas against insurance customer personas.", agentId: '3'
            },
            {
                imgSrc: "/agents/vehicle.svg", agentText: "Id Reader", info: "Returns the value of an uploaded ID document.", agentId: '4'
            },
            {
                imgSrc: "/agents/consumer.svg", agentText: "Person Research", info: "Automates the gathering of relevant data from various sources, like public records and social media, to ensure comprehensive risk assessment.", agentId: '8'
            }
        ]
    },
    {
        bgColor:"bg-[#ffdec9]",
        categorization: "Distribution",
        data: [
            {
                imgSrc: "/agents/policy.svg", agentText: "Policy Word Explainer", info: "Explains covers and exclusions in a simple to understand manner.", agentId: '5'
            },
            {
                imgSrc: "/agents/consumer.svg", agentText: "Company Research", info: "Researches a company for deeper understanding.", agentId: '11'
            },
            {
                imgSrc: "/agents/competitor.svg", agentText: "Competitor Analysis", info: "Analyzes one or two competitors to understand competitive positioning.", agentId: '2'
            },
            {
                imgSrc: "/agents/seo.svg", agentText: "SEO Search", info: "Searches the web for relevant keywords for SEO and advertising strategies.", agentId: '0'
            },
            {
                imgSrc: "/agents/marketing.svg", agentText: "Marketing", info: "Creates ideas and content for marketing campaigns in the insurance industry.", agentId: '1'
            },
            {
                imgSrc: "/agents/chat.svg", agentText: "Chatbot", info: "Engages with potential clients in real time on digital platforms, answering product questions and qualifying leads before handing them to a human agent.", agentId: '6'
            }
        ]
    },
    {
        bgColor:"bg-[#fec9ff]",
        categorization: "Customer service",
        data: [
            {
                imgSrc: "/agents/policy.svg", agentText: "Virtual Assistant", info: "Provides 24/7 support to customer service agents, answering policy-related queries and guiding customers through self-service options (based on uploaded insurance policy or claims process).", agentId: '14'
            },
            {
                imgSrc: "/agents/sentiment.svg", agentText: "Customer Sentiment", info: "Analyzes the web to find customer sentiments.", agentId: '9'
            },
            {
                imgSrc: "/agents/consumer.svg", agentText: "Personalized Recommendation", info: "Suggests policy adjustments or additional coverage options based on input from the customer or agent.", agentId: '10'
            }
        ]
    },
    {
        bgColor:"bg-[#dafff1]",
        categorization: "Provider networks",
        data: [
            {
                imgSrc: "/agents/policy.svg", agentText: "Contract Optimization", info: "Suggests contract optimizations for clarity and ease of reading.", agentId: '12'
            }
        ]
    },
    {
        bgColor:"bg-[#fff8b3]",
        categorization: "Finance",
        data: [
            {
                imgSrc: "/agents/consumer.svg", agentText: "Contract Summarizer", info: "Summarizes key points from an uploaded contract.", agentId: '16'
            },
            {
                imgSrc: "/agents/marketing.svg", agentText: "Automated Budget", info: "Assists finance teams in preparing budgets by analyzing past financial data and projecting future trends.", agentId: '13'
            }
        ]
    },
    {
        bgColor:"bg-[#f9bebd]",
        categorization: "IT",
        data: [
            {
                imgSrc: "/agents/sentiment.svg", agentText: "User Story", info: "Writes user stories for agile software development requirements. Interviews the user and returns a software development requirements document.", agentId: '15'
            },
        ]
    }

]

export default function Agents() {
    const { showSideBar, setShowSideBar, setAgent } = useContext(navContext)
    return (
        <>
            <div className=" flex-1 flex flex-col gap-4 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center font-semibold">
                        {/* <GiHamburgerMenu className="cursor-pointer" onClick={() => setShowSideBar(!showSideBar)} /> */}
                        {/* <p>Distribution</p> */}
                    </div>
                    {/* <div className="flex gap-1 items-center">
            <GoChevronLeft />
            <GoChevronRight />
            <SlOptionsVertical className="text-xs" />
          </div> */}
                </div>
                <div className="flex gap-4 w-full flex-col flex-wrap">
                    {agentsData.map((e,index:number) => <div key={index} className={`flex flex-col gap-4 ${e.bgColor} p-4 rounded-lg`}>
                        <h1 className="font-semibold text-xl">{e.categorization}</h1>
                        <div className="flex gap-4 w-full flex-wrap">
                            {e.data.map((j) => <BaseAgent key={j.agentId} {...j} setAgent={setAgent} />)}
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    );
}
