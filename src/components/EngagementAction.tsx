import { ArrowUpRight } from "lucide-react";
import { Check } from "./ui/Check";
import { cn } from "~/lib/utils";
import sdk from "@farcaster/frame-sdk";
import { TARGET_CAST_HASH } from "~/lib/constants";

const titles = {
    like: "Like",
    recast: "Recast",
    subscribe: "Follow",
};

const descriptions = {
    like: "Like this post",
    recast: "Quote recast with a comment",
    subscribe: "Follow @MAIN_AI_DEX",
};

const icons = {
    like: (
        <svg width="28" height="28" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient
                    id="likeGradient"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(4 4) rotate(45) scale(20)"
                >
                    <stop stopColor="#F67FBC" />
                    <stop offset="80%" stopColor="#555FF5" />
                    <stop offset="100%" stopColor="#9EFFEE" />
                </radialGradient>
            </defs>
            <path
                d="M9 16.0312L9.38813 16.7805C9.26819 16.8426 9.13508 16.8751 9 16.8751C8.86492 16.8751 8.73182 16.8426 8.61188 16.7805L8.60287 16.776L8.58263 16.7648C8.46482 16.7039 8.34853 16.6401 8.23387 16.5735C6.86271 15.7931 5.56911 14.8838 4.37063 13.8577C2.30062 12.0724 0 9.39375 0 6.1875C0 3.1905 2.34675 1.125 4.78125 1.125C6.52163 1.125 8.04712 2.02725 9 3.3975C9.95288 2.02725 11.4784 1.125 13.2188 1.125C15.6532 1.125 18 3.1905 18 6.1875C18 9.39375 15.6994 12.0724 13.6294 13.8577C12.3293 14.9693 10.9178 15.9434 9.41738 16.7648L9.39712 16.776L9.39038 16.7794H9.38813L9 16.0312ZM4.78125 2.8125C3.27825 2.8125 1.6875 4.122 1.6875 6.1875C1.6875 8.60625 3.465 10.8495 5.47312 12.5798C6.56874 13.5169 7.74949 14.3496 9 15.0671C10.2505 14.3496 11.4313 13.5169 12.5269 12.5798C14.535 10.8495 16.3125 8.60625 16.3125 6.1875C16.3125 4.122 14.7218 2.8125 13.2188 2.8125C11.6741 2.8125 10.2836 3.92175 9.81112 5.5755C9.76137 5.75232 9.6552 5.90804 9.50877 6.01895C9.36235 6.12986 9.18369 6.18989 9 6.18989C8.81631 6.18989 8.63765 6.12986 8.49123 6.01895C8.3448 5.90804 8.23863 5.75232 8.18888 5.5755C7.71637 3.92175 6.32587 2.8125 4.78125 2.8125Z"
                fill="url(#likeGradient)"
            />
        </svg>
    ),
    recast: (
        <svg width="28" height="28" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F67FBC" />
                    <stop offset="80%" stopColor="#555FF5" />
                    <stop offset="100%" stopColor="#9EFFEE" />
                </linearGradient>
            </defs>
            <path
                d="M2.41813 9.00562C2.5282 8.99243 2.63979 9.00106 2.74652 9.03101C2.85326 9.06096 2.95305 9.11166 3.04018 9.18019C3.12732 9.24873 3.20009 9.33377 3.25434 9.43044C3.3086 9.52712 3.34327 9.63354 3.35638 9.74362C3.49975 10.9294 3.98324 12.0483 4.7485 12.9653C5.51375 13.8823 6.52806 14.5583 7.669 14.9115C8.80994 15.2648 10.0287 15.2803 11.1783 14.9562C12.3279 14.632 13.359 13.9821 14.1474 13.0849L12.7929 11.7304C12.7534 11.691 12.7266 11.6409 12.7157 11.5863C12.7048 11.5316 12.7104 11.475 12.7317 11.4235C12.753 11.3721 12.7891 11.3281 12.8355 11.2972C12.8818 11.2663 12.9363 11.2499 12.992 11.25H17.0938C17.1683 11.25 17.2399 11.2796 17.2926 11.3324C17.3454 11.3851 17.375 11.4567 17.375 11.5312V15.633C17.3751 15.6887 17.3587 15.7432 17.3278 15.7895C17.2969 15.8359 17.2529 15.872 17.2014 15.8933C17.15 15.9146 17.0934 15.9202 17.0387 15.9093C16.9841 15.8984 16.934 15.8716 16.8946 15.8321L15.3421 14.2796C14.3288 15.3996 13.0148 16.2046 11.5568 16.5988C10.0988 16.993 8.55817 16.9597 7.11854 16.5029C5.67891 16.0461 4.40095 15.1851 3.43693 14.0224C2.47291 12.8597 1.86348 11.4443 1.68125 9.945C1.66806 9.83493 1.67668 9.72333 1.70664 9.6166C1.73659 9.50986 1.78729 9.41008 1.85582 9.32294C1.92436 9.23581 2.0094 9.16303 2.10607 9.10878C2.20275 9.05452 2.30917 9.01985 2.41925 9.00675L2.41813 9.00562ZM9.5 2.8125C8.62026 2.81157 7.75049 2.99869 6.94897 3.36132C6.14745 3.72396 5.4327 4.25372 4.85263 4.91512L6.20713 6.26962C6.24656 6.30896 6.27343 6.35912 6.28432 6.41374C6.29522 6.46836 6.28965 6.52499 6.26832 6.57644C6.24699 6.6279 6.21086 6.67186 6.16452 6.70276C6.11817 6.73366 6.0637 6.7501 6.008 6.75H1.90625C1.83166 6.75 1.76012 6.72037 1.70738 6.66762C1.65463 6.61488 1.625 6.54334 1.625 6.46875V2.367C1.6249 2.3113 1.64134 2.25682 1.67224 2.21048C1.70314 2.16414 1.7471 2.12801 1.79855 2.10668C1.85001 2.08535 1.90663 2.07978 1.96126 2.09068C2.01588 2.10157 2.06604 2.12844 2.10538 2.16787L3.65788 3.72037C4.67122 2.6004 5.98518 1.79536 7.4432 1.40118C8.90122 1.00699 10.4418 1.04029 11.8815 1.49708C13.3211 1.95388 14.5991 2.81493 15.5631 3.97763C16.5271 5.14033 17.1365 6.55566 17.3187 8.055C17.3453 8.27728 17.2825 8.50101 17.1441 8.67697C17.0057 8.85292 16.803 8.96669 16.5807 8.99325C16.3585 9.0198 16.1347 8.95697 15.9588 8.81856C15.7828 8.68016 15.6691 8.47753 15.6425 8.25525C15.4605 6.75419 14.7352 5.37173 13.6035 4.36895C12.4718 3.36617 11.0121 2.8125 9.5 2.8125Z"
                fill="url(#gradient)"
            />
        </svg>
    ),
    subscribe: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 76 60" fill="none">
            <path
                d="M74.7497 0.4021H66.157C65.4706 0.4021 64.9141 0.962395 64.9141 1.65355V58.1186C64.9141 58.8098 65.4706 59.3701 66.157 59.3701H74.7497C75.4362 59.3701 75.9927 58.8098 75.9927 58.1186V1.65355C75.9927 0.962395 75.4362 0.4021 74.7497 0.4021Z"
                fill="url(#paint0_radial_1017_696)"
            />
            <path
                d="M48.5299 59.3699H57.1496C57.8386 59.3699 58.3926 58.8122 58.3926 58.1185V30.1104C58.3926 14.1815 46.1115 0.605959 30.3041 0.0210401C13.6997 -0.604687 0 12.8076 0 29.3894V29.8383C0 46.0392 13.0917 59.2339 29.1963 59.2339C34.4114 59.2339 39.5183 57.8192 43.9633 55.1803C44.3011 54.9762 44.5172 54.5953 44.5172 54.2009V42.9106C44.5172 41.8768 43.2608 41.4143 42.5582 42.176C42.0583 42.7337 41.5179 43.2506 40.9369 43.7539C37.6674 46.5425 33.4926 48.0932 29.1963 48.0932C19.212 48.0932 11.0786 39.9044 11.0786 29.8519V29.7159C11.0786 21.0237 16.9828 13.2565 25.4404 11.5426C36.4244 9.31173 46.1925 17.1741 47.2193 27.5938C47.2464 27.8251 47.2599 28.0427 47.2734 28.274V58.1321C47.2734 58.8258 47.8273 59.3835 48.5164 59.3835L48.5299 59.3699Z"
                fill="url(#paint1_radial_1017_696)"
            />
            <defs>
                <radialGradient
                    id="paint0_radial_1017_696"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(64.6454 0.402098) rotate(70.3423) scale(71.3014 28.8452)"
                >
                    <stop stopColor="#F67FBC" />
                    <stop offset="0.637239" stopColor="#555FF5" />
                    <stop offset="1" stopColor="#9EFFEE" />
                </radialGradient>
                <radialGradient
                    id="paint1_radial_1017_696"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(8.42529 13.918) rotate(53.1785) scale(76.9311 105.766)"
                >
                    <stop stopColor="#F67FBC" />
                    <stop offset="0.637239" stopColor="#555FF5" />
                    <stop offset="0.791119" stopColor="#9EFFEE" />
                </radialGradient>
            </defs>
        </svg>
    ),
};

const handleAction = (type: "like" | "recast" | "subscribe") => {
    switch (type) {
        case "like":
            sdk.actions.viewCast({ hash: TARGET_CAST_HASH });
            break;
        case "recast":
            sdk.actions.composeCast({
                text: `AI isn't assisting anymore. It's the CEO now — fully in charge.

Be the MAIN character of DeFi. Hit the mini-app, register your wallet, and lock in priority access.

@maindex — powered by Algebra Labs.`,
                embeds: [`${TARGET_CAST_HASH}`],
            });
            break;
        case "subscribe":
            sdk.actions.openUrl("https://farcaster.xyz/~/channel/celo");
            break;
    }
};

export function EngagementAction({
    type,
    isDone,
    isLoading,
}: {
    type: "like" | "recast" | "subscribe";
    isDone: boolean | undefined;
    isLoading?: boolean;
}) {
    return (
        <button
            disabled={isDone}
            onClick={() => handleAction(type)}
            className={cn(
                "feature-card w-full p-4 flex cursor-pointer items-center transition-all duration-200 justify-between bg-white rounded-[24px] shadow-lg",
                isDone ? "" : " hover:scale-105 "
            )}
        >
            <div className="feature-card-content flex gap-4 items-center justify-center">
                <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center">{icons[type]}</div>
                <div className={"flex flex-col gap-1 items-start justify-center"}>
                    <h2 className="text-body text-center">{titles[type]}</h2>
                    <p className=" text-center">{descriptions[type]}</p>
                </div>
            </div>
            {isLoading ? null : isDone ? <Check /> : <Redirect />}
        </button>
    );
}

const Redirect = () => (
    <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center">
        <ArrowUpRight className="text-neutral-600" size={28} />
    </div>
);
