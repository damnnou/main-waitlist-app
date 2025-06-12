import axios from "axios";
import useSWR from "swr";
import { useRef, useCallback, useState } from "react";

type EngagementActions = {
    didSuscribed: boolean;
    didRecast: boolean;
    didLike: boolean;
    eligible: boolean;
};

export function useEngagementActions(fid: number | undefined) {
    const {
        data,
        isLoading,
        mutate: originalMutate,
    } = useSWR<EngagementActions>(["checkActions", fid], async () => {
        if (!fid) return null;
        const { data } = await axios.get(`/api/check-actions?fid=${fid}`);
        return data;
    });

    const lastMutateRef = useRef(0);
    const MIN_INTERVAL = 3000;

    const [isNewDataLoading, setIsNewDataLoading] = useState(false);

    const mutate = useCallback(
        async (...args: Parameters<typeof originalMutate>) => {
            const now = Date.now();
            if (now - lastMutateRef.current < MIN_INTERVAL) {
                return;
            }
            lastMutateRef.current = now;

            try {
                setIsNewDataLoading(true);
                return await originalMutate(...args);
            } finally {
                setIsNewDataLoading(false);
            }
        },
        [originalMutate]
    );

    return {
        didSuscribed: data?.didSuscribed,
        didRecast: data?.didRecast,
        didLike: data?.didLike,
        eligible: data?.eligible,
        refetch: mutate,
        isLoading,
        isNewDataLoading,
    };
}
