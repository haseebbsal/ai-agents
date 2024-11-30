import NavProvider from "@/providers/nav-provider";
import QueryProvider from "@/providers/query-provider";
import { ReactNode } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <QueryProvider>
                <NavProvider>
                    {children}
                </NavProvider>
                <ToastContainer />
            </QueryProvider>
        </>
    )
}