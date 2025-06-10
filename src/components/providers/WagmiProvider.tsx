import React from "react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { WagmiProvider } from "wagmi";
import { base, optimism, mainnet, AppKitNetwork } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WALLET_CONNECT_PROJECT_ID } from "~/lib/constants";

const queryClient = new QueryClient();

const networks: AppKitNetwork[] = [mainnet, base, optimism];

const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId: WALLET_CONNECT_PROJECT_ID!,
    ssr: true,
});

createAppKit({
    adapters: [wagmiAdapter],
    networks: [networks[0]],
    projectId: WALLET_CONNECT_PROJECT_ID!,
});

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
}
