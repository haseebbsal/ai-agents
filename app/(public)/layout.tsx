import NavProvider from "@/providers/nav-provider";
import QueryProvider from "@/providers/query-provider";
import { ReactNode } from "react";
export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <QueryProvider>
                <NavProvider>
                    {children}
                </NavProvider>
            </QueryProvider>
        </>
    )
}