'use client'
import {NextUIProvider} from "@nextui-org/system";
import { ReactNode } from "react";

export default function UiProvider({children}:{children:ReactNode}) {
  return (
    <NextUIProvider>
     {children}
    </NextUIProvider>
  );
}