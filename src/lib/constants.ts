export const APP_URL = process.env.NEXT_PUBLIC_URL!;
export const APP_NAME = process.env.NEXT_PUBLIC_FRAME_NAME;
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_FRAME_DESCRIPTION;
export const APP_PRIMARY_CATEGORY = process.env.NEXT_PUBLIC_FRAME_PRIMARY_CATEGORY;
export const APP_TAGS = process.env.NEXT_PUBLIC_FRAME_TAGS?.split(",");
export const APP_ICON_URL = `${APP_URL}/icon.png`;
export const APP_OG_IMAGE_URL = `https://img.notionusercontent.com/s3/prod-files-secure%2F3f29d580-f49b-4d67-ae42-0cf5b035e152%2F4098be77-1d0d-4d40-9deb-9d31e286a20a%2Fblog1banner.png/size/?exp=1749313801&sig=6HVwUa8TiO4bc8OS9KGp-1iWqIP68kPBuOrjzFN4uII&id=1ce2ea92-007f-8038-b9ec-db2df2b85f72&table=block`;
export const APP_SPLASH_URL = `${APP_URL}/splash.png`;
export const APP_SPLASH_BACKGROUND_COLOR = "#f7f7f7";
export const APP_BUTTON_TEXT = process.env.NEXT_PUBLIC_FRAME_BUTTON_TEXT;
export const APP_WEBHOOK_URL =
    process.env.NEYNAR_API_KEY && process.env.NEYNAR_CLIENT_ID
        ? `https://api.neynar.com/f/app/${process.env.NEYNAR_CLIENT_ID}/event`
        : `${APP_URL}/api/webhook`;
