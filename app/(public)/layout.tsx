'use client'
import HomeNavbar from "@/components/common/home-navbar";
import BaseAutoComplete from "@/components/form/base-autocomplete";
import BaseInput from "@/components/form/base-input";
import NavProvider from "@/providers/nav-provider";
import { createContext, ReactNode, useState } from "react";
export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavProvider>
                {children}
            </NavProvider>
        </>
    )
}