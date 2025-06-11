export const APP_URL = process.env.NEXT_PUBLIC_URL!;
export const APP_NAME = process.env.NEXT_PUBLIC_FRAME_NAME;
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_FRAME_DESCRIPTION;
export const APP_PRIMARY_CATEGORY = process.env.NEXT_PUBLIC_FRAME_PRIMARY_CATEGORY;
export const APP_TAGS = process.env.NEXT_PUBLIC_FRAME_TAGS?.split(",");
export const APP_ICON_URL = `${APP_URL}/icon.png`;
export const APP_OG_IMAGE_URL = `https://main-waitlist-app.vercel.app/appBanner.jpg`;
export const APP_SPLASH_URL = `${APP_URL}/splash.png`;
export const APP_SPLASH_BACKGROUND_COLOR = "#f7f7f7";
export const APP_BUTTON_TEXT = process.env.NEXT_PUBLIC_FRAME_BUTTON_TEXT;
export const APP_WEBHOOK_URL =
    process.env.NEYNAR_API_KEY && process.env.NEYNAR_CLIENT_ID
        ? `https://api.neynar.com/f/app/${process.env.NEYNAR_CLIENT_ID}/event`
        : `${APP_URL}/api/webhook`;

export const WALLET_CONNECT_PROJECT_ID = "3923ce49b85e8477c0179057b62ff8b8";

export const MAIN_CHANNEL_FID = 1103116;
export const TARGET_CAST_HASH = "0x6243834500ed117f8fea9c3270355af020229e09";
