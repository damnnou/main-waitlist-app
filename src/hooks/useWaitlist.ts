import axios from "axios";
import useSWR from "swr";
import { useState, useCallback } from "react";

export function useWaitlist(fid: number | undefined) {
    const { data, isLoading, mutate } = useSWR<boolean>(["checkWaitlist", fid], async () => {
        if (!fid) return null;
        const { data } = await axios.get(`/api/waitlist?fid=${fid}`);
        return data.whitelisted;
    });

    const [postError, setPostError] = useState<string | null>(null);
    const [isPosting, setIsPosting] = useState(false);

    const addToWaitlist = useCallback(
        async (fid: number, evm_wallet: string, username?: string) => {
            if (!fid) return;

            setIsPosting(true);
            setPostError(null);

            try {
                const { data } = await axios.post("/api/waitlist", {
                    fid,
                    evm_wallet,
                    username,
                });

                if (data.success) {
                    mutate(true, false);
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
        whitelisted: data,
        isLoading: isLoading,
        addToWaitlist,
        isPosting,
        postError,
    };
}
