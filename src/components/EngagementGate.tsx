import { EngagementAction } from "./EngagementAction";
import { useEngagementActions } from "~/hooks/useEngagementActions";
import { Button } from "./ui/Button";
import { RotateCw, Share, Wallet, Zap } from "lucide-react";
import { cn } from "~/lib/utils";
import { useFrame } from "./providers/FrameProvider";
import { useEffect } from "react";
import { useWaitlist } from "~/hooks/useWaitlist";
import { Star } from "./ui/Star";
import { Loader } from "./ui/Loader";
import { useFarcasterWallet } from "~/hooks/useFarcasterWallet";
import { Check } from "./ui/Check";
import { useAppKit, useAppKitAccount, useWalletInfo } from "@reown/appkit/react";
import sdk from "@farcaster/frame-sdk";
import { APP_URL } from "~/lib/constants";

export default function EngagementGate({ fid }: { fid: number | undefined }) {
    const { eligible, didLike, didRecast, didSuscribed, refetch, isLoading: actionsLoading, isNewDataLoading } = useEngagementActions(fid);

    const { context } = useFrame();

    const { addToWaitlist, whitelisted, isLoading: waitlistLoading, whitelistedAddress, isPosting: isWaitlistPosting } = useWaitlist(fid);

    const { isError: isFarcasterWalletDoesNotExist, data: farcasterWallet, isLoading: farcasterWalletLoading } = useFarcasterWallet(fid);

    const { address: evmWallet, status } = useAppKitAccount();

    const { walletInfo } = useWalletInfo();

    const isEmbedded = !walletInfo && evmWallet;

    const isPending = status === "connecting";

    const { open } = useAppKit();

    const handleAddToWaitlist = (address: string, wallet_type: string) => {
        if (!context) return;
        addToWaitlist(context.user.fid, address, context.user.username, wallet_type);
    };

    useEffect(() => {
        if (evmWallet && !isPending && !isEmbedded) {
            handleAddToWaitlist(evmWallet, "external");
        }
    }, [evmWallet, isPending, isEmbedded]);

    const handleShare = async () => {
        sdk.actions.composeCast({
            text: `AI isn't assisting. It's the CEO now.

Open the mini-app. Register your wallet. Enjoy priority access.

@maindex — powered by Algebra Labs.`,
            embeds: [APP_URL],
        });
    };

    const isLoading = waitlistLoading || actionsLoading || farcasterWalletLoading;

    if (isLoading)
        return (
            <div className="w-full flex flex-col my-auto gap-4 items-center justify-center">
                <Loader />
            </div>
        );

    return (
        <div className="w-full flex flex-col my-auto gap-4 items-center justify-center">
            {!eligible ? (
                <div className="flex flex-col w-full gap-4 items-center justify-center">
                    <h1 className="text-h1 font-semibold flex items-center">Join Waitlist</h1>
                    <p className="w-fit text-center">Follow these steps to unlock access to the waitlist:</p>
                    <ul className="flex flex-col gap-4 text-sm w-full">
                        <li className="flex items-center">
                            <EngagementAction type="subscribe" isDone={didSuscribed} isLoading={actionsLoading} />
                        </li>
                        <li className="flex items-center">
                            <EngagementAction type="like" isDone={didLike} isLoading={actionsLoading} />
                        </li>
                        <li className="flex items-center">
                            <EngagementAction type="recast" isDone={didRecast} isLoading={actionsLoading} />
                        </li>
                    </ul>
                    <Button
                        onClick={() => refetch()}
                        disabled={isNewDataLoading}
                        className={cn(
                            "flex items-center justify-center transition-all duration-300 disabled:opacity-60",
                            isNewDataLoading ? "hover:!scale-100 slow-pulse" : ""
                        )}
                    >
                        <RotateCw size={18} className={cn("transition-all duration-300")} />

                        <span className={cn("transition-opacity duration-300")}>Verify Engagement</span>
                    </Button>
                </div>
            ) : whitelisted ? (
                <div className="flex flex-col gap-4 w-full items-center justify-center relative">
                    <Star bg size={52} />
                    <h2 className="text-lg font-semibold flex items-center">{"You're in!"}</h2>
                    <p className="w-fit text-center">
                        Thanks for joining the waitlist. <br />
                        {"We'll reach out before the next drop."}
                    </p>

                    <div className="flex flex-col gap-0 text-center items-center justify-center text-xs">
                        <p>Your Address: </p>
                        <p>{whitelistedAddress}</p>
                    </div>

                    <button
                        onClick={handleShare}
                        className="w-full max-w-64 flex duration-200 hover:scale-105 min-h-[56px] mx-auto rounded-xl shadow-lg items-center gap-2 justify-center bg-violet-500 text-white py-3 px-6  transition-all disabled:opacity-50 disabled:cursor-not-allowed relative"
                    >
                        <Share size={18} /> Share Mini App
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-4 w-full items-center justify-center relative">
                    {isPending || isWaitlistPosting ? <Loader /> : <Check bg size={52} />}
                    <h2 className="text-lg font-semibold flex items-center">{"You're eligible!"}</h2>
                    <p className="w-fit text-center">
                        Now connect your wallet <br /> to join the waitlist.
                    </p>

                    {!isFarcasterWalletDoesNotExist && (
                        <button
                            disabled={isPending || !farcasterWallet || isWaitlistPosting}
                            onClick={() => farcasterWallet && handleAddToWaitlist(farcasterWallet, "native")}
                            className="w-full max-w-64  flex duration-200 hover:scale-105 min-h-[56px] mx-auto rounded-xl shadow-lg items-center gap-2 justify-center bg-violet-500 text-white py-3 px-6  transition-all disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                            <Zap size={18} /> Login with Farcaster
                        </button>
                    )}
                    <button
                        disabled={isPending || isWaitlistPosting}
                        onClick={async () => {
                            try {
                                await open({
                                    view: "Connect",
                                });
                            } catch (e) {
                                console.warn(e);
                            }
                        }}
                        className="w-full max-w-64 flex duration-200 hover:scale-105 min-h-[56px] mx-auto rounded-xl shadow-lg items-center gap-2 justify-center bg-white border-black py-3 px-6  transition-all disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed relative"
                    >
                        <Wallet size={18} /> Connect External Wallet
                    </button>
                </div>
            )}
        </div>
    );
}
