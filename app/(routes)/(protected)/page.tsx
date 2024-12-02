'use client'
import BaseAgent from "@/components/common/base-agent";
import { navContext } from "@/providers/nav-provider";
import Link from "next/link";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { SlOptionsVertical } from "react-icons/sl";
export default function Home() {
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
        <div className="flex gap-4 w-full flex-col flex-wrap items-center sm:w-1/2 mx-auto">
          {/* <BaseAgent agentId='7' setAgent={setAgent} imgSrc="/agents/vehicle.svg" agentText="Vehicle Data Agent" info="Find vehicle information based on VIN/Chassis input or manual selection and returns a comprehensive report based on specifications and internet search." /> */}
          <p className="text-2xl font-semibold text-center">Welcome to Insurance Agents</p>
          <p className="text-center">These agents have been built exclusively to help insurance professionals understand how to engage with artificial intelligence and AI agents. They are free to use and do not require any connectivity to any systems. Go ahead and enjoy using the AI agents. If you want us to build other agents or provide feedback, your input is very welcome. Please send your feedback to <span className="text-main-1">feedback@insurancebots.ai.</span></p>
          <Link href={'/agents'} className="bg-main-1 text-white min-w-28 flex items-center justify-center rounded-lg  !h-[3rem] p-4">Check Out Our Agents</Link>
        </div>
      </div>
    </>
  );
}
