import React from "react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { CreateConnectorFn, WagmiProvider } from "wagmi";
import { base, optimism, mainnet, AppKitNetwork } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { WALLET_CONNECT_PROJECT_ID } from "~/lib/constants";

const connectors: CreateConnectorFn[] = [];
connectors.push(farcasterFrame());

const queryClient = new QueryClient();

const networks: AppKitNetwork[] = [mainnet, base, optimism];

const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId: WALLET_CONNECT_PROJECT_ID!,
    connectors,
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
