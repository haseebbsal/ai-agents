'use client'
import BaseAgent from "@/components/common/base-agent";
import { navContext } from "@/providers/nav-provider";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { SlOptionsVertical } from "react-icons/sl";
export default function Home() {
  const { showSideBar, setShowSideBar,setAgent } = useContext(navContext)
  return (
    <>
      <div className=" flex-1 flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center font-semibold">
            <GiHamburgerMenu className="cursor-pointer" onClick={() => setShowSideBar(!showSideBar)} />
            <p>Distribution</p>
          </div>
          <div className="flex gap-1 items-center">
            <GoChevronLeft />
            <GoChevronRight />
            <SlOptionsVertical className="text-xs" />
          </div>
        </div>
        <div className="flex gap-4 w-full flex-wrap">
          <BaseAgent agentId='8' setAgent={setAgent} imgSrc="/agents/policy.svg" agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner." />
          <BaseAgent agentId='7' setAgent={setAgent} imgSrc="/agents/vehicle.svg" agentText="Vehicle Data Agent" info="Find vehicle information based on VIN/Chassis input or manual selection and returns a comprehensive report based on specifications and internet search." />
          <BaseAgent agentId='6' setAgent={setAgent} imgSrc="/agents/consumer.svg" agentText="Consumer Digital Twin" info="Compares products and marketing ideas against insurance customer personas." />
          <BaseAgent agentId='5' setAgent={setAgent} imgSrc="/agents/risk.svg" agentText="Emerging Risk Identification Agent" info="Provided an overview of emerging risks within a specific insurance product area." />
          <BaseAgent agentId='4' setAgent={setAgent} imgSrc="/agents/chat.svg" agentText="Chatbot Agent" info="Engages with potential clients in real time on digital platforms, answering product questions and qualifying leads before handing them to a human agent." />
          <BaseAgent agentId='3' setAgent={setAgent} imgSrc="/agents/customer.svg" agentText="Customer Research Agent" info="Researcher a customer via public information." />
          <BaseAgent agentId='2' setAgent={setAgent} imgSrc="/agents/competitor.svg" agentText="Competitor Analysis Agent" info="Compares products and marketing ideas against insurance customer personas." />
          <BaseAgent agentId='0' setAgent={setAgent} imgSrc="/agents/seo.svg" agentText="SEO Search Agent" info="Searches the web for relevant keywords for SEO and advertising strategies." />
          <BaseAgent agentId='1' setAgent={setAgent} imgSrc="/agents/marketing.svg" agentText="Marketing Agent" info="Creates ideas and content for marketing campaigns in the insurance industry." />
          <BaseAgent agentId='9' setAgent={setAgent} imgSrc="/agents/sentiment.svg" agentText="Customer Sentiment" info="Scrapes the web to find customer sentiments about the company and presents the findings at aggregate level." />
          <BaseAgent agentId='10' setAgent={setAgent} imgSrc="/agents/chat.svg" agentText="Personalized Recommendation"  />

        </div>
      </div>
    </>
  );
}
