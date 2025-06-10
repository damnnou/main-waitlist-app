import axios from "axios";
import useSWR from "swr";
import { useState, useCallback } from "react";

export function useWaitlist(fid: number | undefined) {
    const { data, isLoading, mutate } = useSWR<{
        whitelisted: boolean;
        data: { username: string; wallet_address: string; joined_at: string; wallet_type: string } | null | undefined;
    }>(["checkWaitlist", fid], async () => {
        if (!fid) return null;
        const { data } = await axios.get(`/api/waitlist?fid=${fid}`);
        return data;
    });

    const [postError, setPostError] = useState<string | null>(null);
    const [isPosting, setIsPosting] = useState(false);

    const addToWaitlist = useCallback(
        async (fid: number, wallet_address: string, username: string | undefined, wallet_type: string) => {
            setIsPosting(true);
            setPostError(null);

            try {
                const { data: postData } = await axios.post("/api/waitlist", {
                    fid,
                    wallet_address,
                    username,
                    wallet_type,
                });

                if (postData.success) {
                    mutate((prevData) => {
                        if (!prevData) return prevData;
                        return {
                            ...prevData,
                            whitelisted: true,
                            data: {
                                username: username || prevData.data?.username || "",
                                wallet_address,
                                wallet_type,
                                joined_at: new Date().toISOString(),
                            },
                        };
                    }, false);
                } else {
                    setPostError("Failed to add to waitlist");
                }
            } catch (error: any) {
                setPostError(error?.message || "Error adding to waitlist");
            } finally {
                setIsPosting(false);
            }
        },
        [mutate]
    );

    return {
        whitelisted: data?.whitelisted,
        whitelistedAddress: data?.data?.wallet_address || null,
        isLoading: isLoading,
        addToWaitlist,
        isPosting,
        postError,
    };
}
