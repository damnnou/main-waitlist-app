"use client";

import { useFrame } from "~/components/providers/FrameProvider";
import EngagementGate from "./EngagementGate";
import Header from "./Header";

export default function Demo() {
    const { isSDKLoaded, context } = useFrame();

    if (!isSDKLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center  h-full">
            <Header username={context?.user.username} />
            <EngagementGate fid={context?.user.fid} />
        </div>
    );
}
