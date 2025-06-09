"use client";

import EngagementGate from "~/components/EngagementGate";
import Header from "~/components/Header";
import { useFrame } from "~/components/providers/FrameProvider";

export default function MainPage() {
    const { isSDKLoaded, context } = useFrame();

    if (!isSDKLoaded) {
        return <div />;
    }

    return (
        <div className="flex flex-col items-center mx-auto max-w-[380px]  h-full">
            <Header username={context?.user.username} userLogoUrl={context?.user.pfpUrl} />
            <EngagementGate fid={context?.user.fid} />
        </div>
    );
}
