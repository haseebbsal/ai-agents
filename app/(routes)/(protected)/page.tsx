'use client'
import BaseAgent from "@/components/common/base-agent";
import { navContext } from "@/providers/nav-provider";
import Link from "next/link";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { SlOptionsVertical } from "react-icons/sl";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const agentsData = [
  {
    bgColor: "bg-[#DEE2E6]",

    categorization: "Underwriting",
    data: [
      {
        imgSrc: "/agents/risk.svg", agentText: "Emerging Risk Identification", info: "Provides an overview of emergent risks within a specific insurance product area and in a specific part of the world.", agentId: '7'
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
    bgColor: "bg-[#DEE2E6]",
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
    bgColor: "bg-[#DEE2E6]",
    categorization: "Policy administration",
    data: [
      {
        imgSrc: "/agents/policy.svg", agentText: "Document Processing", info: "Extracts and processes policyholder information from digital documents, reducing administrative workload.", agentId: '17'
      },

    ]
  },
  {
    bgColor: "bg-[#DEE2E6]",

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
    bgColor: "bg-[#DEE2E6]",

    categorization: "Claims Operations",
    data: [
      {
        imgSrc: "/agents/policy.svg", agentText: "Claims Processing", info: "Compares a claim document against a series of preset rules.", agentId: '18'
      },
    ]
  },
  {
    bgColor: "bg-[#DEE2E6]",

    categorization: "Provider networks",
    data: [
      {
        imgSrc: "/agents/policy.svg", agentText: "Contract Optimization", info: "Suggests contract optimizations for clarity and ease of reading.", agentId: '12'
      }
    ]
  },
  {
    bgColor: "bg-[#DEE2E6]",

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
    bgColor: "bg-[#DEE2E6]",

    categorization: "IT",
    data: [
      {
        imgSrc: "/agents/sentiment.svg", agentText: "User Story", info: "Writes user stories for agile software development requirements. Interviews the user and returns a software development requirements document.", agentId: '15'
      },
    ]
  },
  {
    bgColor: "bg-[#DEE2E6]",

    categorization: "HR & administration",
    data: [
      {
        imgSrc: "/agents/customer.svg", agentText: "Onboarding", info: "Guides new employees through the onboarding process, providing resources and answering common questions.", agentId: '19'
      },
    ]
  }

]


export default function Home() {
  const { showSideBar, setShowSideBar, setAgent } = useContext(navContext)
  return (
    <>
      <div className=" flex-1 flex flex-col gap-4 p-4 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4 items-center font-semibold w-full">
            {/* <GiHamburgerMenu className="cursor-pointer" onClick={() => setShowSideBar(!showSideBar)} /> */}
            {/* <p>Distribution</p> */}
          </div>
          {/* <div className="flex gap-1 items-center">
            <GoChevronLeft />
            <GoChevronRight />
            <SlOptionsVertical className="text-xs" />
          </div> */}
        </div>
        <div className="flex gap-4 w-full flex-col flex-wrap items-center sm:w-1/2 mx-auto">
          {/* <BaseAgent agentId='7' setAgent={setAgent} imgSrc="/agents/vehicle.svg" agentText="Vehicle Data Agent" info="Find vehicle information based on VIN/Chassis input or manual selection and returns a comprehensive report based on specifications and internet search." /> */}
          <p className="text-2xl font-semibold text-center">Welcome to Insurance Agents</p>
          <p className="text-center">These agents have been built exclusively to help insurance professionals understand how to engage with artificial intelligence and AI agents. They are free to use and do not require any connectivity to any systems. Go ahead and enjoy using the AI agents. If you want us to build other agents or provide feedback, your input is very welcome. Please send your feedback to <span className="text-main-1">feedback@insurancebots.ai.</span></p>
          {/* <Link href={'/agents'} className="bg-main-1 text-white min-w-28 flex items-center justify-center rounded-lg  !h-[3rem] p-4">Check Out Our Agents</Link> */}
        </div>
        <div className=" flex-1 flex flex-col gap-4 w-full p-4">
          <div className="flex justify-center gap-4 flex-wrap items-center">
            {agentsData.map((e) => <Link className="p-4 rounded-lg min-w-28 flex justify-center bg-main-1 text-white" href={`#${e.categorization}`}>{e.categorization}</Link>)}

          </div>
          <div className="flex gap-4 w-full flex-col flex-wrap">
            {agentsData.map((e, index: number) => <div key={index} id={e.categorization} className={`flex flex-col  w-full !text-text-2 gap-4  p-4 rounded-lg`}>
              <h1 className="font-semibold text-2xl  text-center">{e.categorization}</h1>
              <div className=" gap-4 w-full flex sm:!hidden   flex-wrap">
                <Swiper
                  className="w-full"
                  modules={[Pagination, Autoplay]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  spaceBetween={0}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 100,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 100,
                    },
                  }}
                //   onSlideChange={() => console.log('slide change')}
                //   onSwiper={(swiper) => console.log(swiper)}
                >
                  {e.data.map((j) => <SwiperSlide className="h-full" key={j.agentId}><BaseAgent  {...j} setAgent={setAgent} /></SwiperSlide>)}
                </Swiper>
              </div>
              <div className=" gap-4 w-full hidden sm:flex   flex-wrap">
                {e.data.map((j) => <BaseAgent key={j.agentId} {...j} setAgent={setAgent} />)}
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </>
  );
}
