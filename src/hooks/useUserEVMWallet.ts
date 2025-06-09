import axios from "axios";
import useSWR from "swr";

export function useUserEVMWallet(fid: number | undefined) {
    const { data, isLoading } = useSWR<string>(["userEVMWallet", fid], async () => {
        if (!fid) return null;
        const { data } = await axios.get(`https://api.farcaster.xyz/fc/primary-address?fid=${fid}&protocol=ethereum`);
        return data?.result?.address?.address;
    });

    return { data, isLoading };
}
