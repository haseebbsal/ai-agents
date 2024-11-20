'use client'

import HomeNavbar from "@/components/common/home-navbar"
import BaseAutoComplete from "@/components/form/base-autocomplete"
import BaseInput from "@/components/form/base-input"
import { createContext, ReactNode, useState } from "react"

export const navContext = createContext<any>({})
export default function NavProvider({ children }: { children: ReactNode }) {
    const [showSideBar, setShowSideBar] = useState<boolean>(true)
    return (
        <>
            <navContext.Provider value={{ showSideBar, setShowSideBar }}>
                <div className="min-h-screen flex-col flex">
                    <HomeNavbar />
                    <div className="flex flex-1">
                        {showSideBar && <div className={`bg-backgroundColors-1 flex-[0.3_1_0] p-4 flex-col gap-4 flex`}>
                            <BaseInput type="search" placeholder="Search 100 agents..." variant="bordered" />
                            <BaseAutoComplete placeholder="Filter by tag..." />
                            <div className="flex flex-col gap-4">
                                <p className="font-semibold">Recently Viewed</p>
                                <p className="bg-backgroundColors-2 p-4 text-text-1  rounded-xl">Distribution</p>
                                <p className=" p-4 text-text-1 rounded-xl">Distribution</p>
                                <p className=" p-4 text-text-1 rounded-xl">Distribution</p>
                                <p className=" p-4 text-text-1 rounded-xl">Distribution</p>

                            </div>
                        </div>}

                        {children}
                    </div>
                </div>

            </navContext.Provider>

        </>
    )
}