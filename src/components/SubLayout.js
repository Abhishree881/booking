"use client";

import ReduxProvider from "@/redux/provider";
import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";
import Navbar from "./Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import PopupLayout from "./Popups/PopupLayout";
import { StytchLogin } from '@stytch/nextjs';


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
        {/* <StytchLogin config={{
        products: ['oauth'],
        oauthOptions: {
          providers: [{
            type: 'google',
            one_tap: true,
          }],
        },
      }} /> */}
        {children}
      </ReduxProvider>
    </StytchProvider>
  );
}

export default ClientLayout;