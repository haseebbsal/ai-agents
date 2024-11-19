'use client'
import BaseAgent from "@/components/common/base-agent";
import { navContext } from "@/providers/nav-provider";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { SlOptionsVertical } from "react-icons/sl";
export default function Home() {
  const {showSideBar,setShowSideBar}=useContext(navContext)
  return (
    <>
      <div className=" flex-1 flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center font-semibold">
            <GiHamburgerMenu className="cursor-pointer" onClick={()=>setShowSideBar(!showSideBar)}/>
            <p>Distribution</p>
          </div>
          <div className="flex gap-1 items-center">
            <GoChevronLeft />
            <GoChevronRight />
            <SlOptionsVertical className="text-xs" />
          </div>
        </div>
        <div className="flex gap-4 w-full flex-wrap">
          <BaseAgent agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner" credit="1 Credit" execution="25.2k"/>
          <BaseAgent agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner" credit="1 Credit" execution="25.2k"/>
          <BaseAgent agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner" credit="1 Credit" execution="25.2k"/>
          <BaseAgent agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner" credit="1 Credit" execution="25.2k"/>
          <BaseAgent agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner" credit="1 Credit" execution="25.2k"/>
          <BaseAgent agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner" credit="1 Credit" execution="25.2k"/>
          <BaseAgent agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner" credit="1 Credit" execution="25.2k"/>
          <BaseAgent agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner" credit="1 Credit" execution="25.2k"/>
          <BaseAgent agentText="Policy Word Explainer Agent" info="Explains cover and exclusions in a simple to understand manner" credit="1 Credit" execution="25.2k"/>
        </div>
      </div>
    </>
  );
}
