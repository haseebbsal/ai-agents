'use client'
import BaseAgent from "@/components/common/base-agent";
import { navContext } from "@/providers/nav-provider";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { SlOptionsVertical } from "react-icons/sl";
export default function Home() {
  const { showSideBar, setShowSideBar } = useContext(navContext)
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
          <BaseAgent imgSrc="/agents/policy.svg" agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner." />
          <BaseAgent imgSrc="/agents/vehicle.svg" agentText="Vehicle Data Agent" info="Find vehicle information based on VIN/Chassis input or manual selection and returns a comprehensive report based on specifications and internet search." />
          <BaseAgent imgSrc="/agents/consumer.svg" agentText="Consumer Digital Twin" info="Compares products and marketing ideas against insurance customer personas." />
          <BaseAgent imgSrc="/agents/risk.svg" agentText="Emerging Risk Identification Agent" info="Provided an overview of emerging risks within a specific insurance product area." />
          <BaseAgent imgSrc="/agents/chat.svg" agentText="Chatbot Agent" info="Engages with potential clients in real time on digital platforms, answering product questions and qualifying leads before handing them to a human agent." />
          <BaseAgent imgSrc="/agents/customer.svg" agentText="Customer Research Agent" info="Researcher a customer via public information." />
          <BaseAgent imgSrc="/agents/competitor.svg" agentText="Competitor Analysis Agent" info="Compares products and marketing ideas against insurance customer personas." />
          <BaseAgent imgSrc="/agents/seo.svg" agentText="SEO Search Agent" info="Searches the web for relevant keywords for SEO and advertising strategies." />
          <BaseAgent imgSrc="/agents/marketing.svg" agentText="Marketing Agent" info="Creates ideas and content for marketing campaigns in the insurance industry." />
        </div>
      </div>
    </>
  );
}
