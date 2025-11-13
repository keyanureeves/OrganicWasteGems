"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "@/lib/config";

const queryClient = new QueryClient();  // Create a new QueryClient instance for managing server state // 

type Props = {
  children: React.ReactNode;
  cookie?: string; 
};

export default function Providers({ children, cookie}: Props) {
  const initialState = cookieToInitialState(config, cookie);
  // Convert the cookie to an initial state for Wagmi //


  return (
    <WagmiProvider config={config} initialState = {initialState}> 
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#0E76FD",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}