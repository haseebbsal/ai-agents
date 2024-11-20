import NavProvider from "@/providers/nav-provider";
import { ReactNode } from "react";
export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavProvider>
                {children}
            </NavProvider>
        </>
    )
}