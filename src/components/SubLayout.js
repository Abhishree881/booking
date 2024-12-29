"use client";

import ReduxProvider from "@/redux/provider";
import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";
import Navbar from "./Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import PopupLayout from "./Popups/PopupLayout";


const stytchClient = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN
);

function ClientLayout({children}){
  return (
    <StytchProvider stytch={stytchClient}>
      <ReduxProvider>
        <Navbar/>
        <Toaster/>
        <PopupLayout/>
        {children}
      </ReduxProvider>
    </StytchProvider>
  );
}

export default ClientLayout;