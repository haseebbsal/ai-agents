'use client'

import Footer from "@/components/common/footer"
import HomeNavbar from "@/components/common/home-navbar"
import BaseAutoComplete from "@/components/form/base-autocomplete"
import BaseInput from "@/components/form/base-input"
import { createContext, ReactNode, useState } from "react"

export const navContext = createContext<any>({})
export default function NavProvider({ children }: { children: ReactNode }) {
    const [showSideBar, setShowSideBar] = useState<boolean>(true)
    const [showInstructions,setShowInstructions]=useState<boolean>(true)
    const [agent,setAgent]=useState<any>()
    return (
        <>
        {/* ded */}
            <navContext.Provider value={{ showSideBar, setShowSideBar,agent,setAgent,setShowInstructions,showInstructions}}>
                <div className="min-h-[100vh] flex-col flex">
                    <HomeNavbar />
                    <div className="flex flex-1 gap-4 ">
                        {/* {showSideBar && <div className={`bg-backgroundColors-1 flex-[0.3_1_0] p-4 flex-col gap-4 flex border-r-1 border-main-2`}>
                            <BaseInput type="search" placeholder="Search 100 agents..." variant="bordered" />
                            <BaseAutoComplete placeholder="Filter by tag..." />
                            <div className="flex flex-col gap-4">
                                <p className="font-semibold">Recently Viewed</p>
                                <p className="bg-backgroundColors-2 p-4 text-text-1  rounded-xl">Distribution</p>
                                <p className=" p-4 text-text-1 rounded-xl">Distribution</p>
                                <p className=" p-4 text-text-1 rounded-xl">Distribution</p>
                                <p className=" p-4 text-text-1 rounded-xl">Distribution</p>
                            </div>
                        </div>} */}

                        {children}
                    </div>
                    <Footer/>
                </div>
            </navContext.Provider>

        </>
    )
}