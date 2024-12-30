import { DM_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/SubLayout";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"], 
})

export const metadata = {
  title: "Booking App",
  description: "Generated for Workwise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
      >
        {/* Adding this layout component to use client side routing */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
