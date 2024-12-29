"use client";

import ReduxProvider from "@/redux/provider";
import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";
import Navbar from "./Navbar/Navbar";


const stytchClient = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN
);

export default function ClientLayout({children}){
  return (
    <StytchProvider stytch={stytchClient}>
      <ReduxProvider>
        <Navbar/>
        {children}
      </ReduxProvider>
    </StytchProvider>
  );
}