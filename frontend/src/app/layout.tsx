//import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "./theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./globals.css";
//import Header from "@/components/common/header/header";
import { Metadata } from "next";
import { RefToastProvider } from "./toast.wrapper";
import AppClient from "./app.client";
import { GlobalLoadingProvider } from "./_components/global.loading.provider";
import { SWRProviderWrapper } from "./swr-provider-wrapper";
import { TransitionProvider } from "./context/transition.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Case Study",
  description: "Case Study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="../../../assets/images/favicon.ico" />
      <link
        rel="apple"
        sizes="180x180"
        href="../../../assets/images/favicon.ico"
      /> */}
      <body className={"pl-7 pr-7 mt-4 mb-5"+inter.className}>
        <RefToastProvider>
          <SWRProviderWrapper>
            <PrimeReactProvider>
              <header></header>
              <AppClient />
              <GlobalLoadingProvider>
                <TransitionProvider>{children}</TransitionProvider>
              </GlobalLoadingProvider>
            </PrimeReactProvider>
          </SWRProviderWrapper>
        </RefToastProvider>
      </body>
    </html>
  );
}
