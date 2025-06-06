import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export const Loader = ({ size = 48 }: { size?: number }) => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            rotate: 360,
            transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        });
    }, [controls]);

    return (
        <motion.svg width={size} height={size} viewBox="0 0 50 50" animate={controls} style={{ display: "block", margin: "auto" }}>
            <defs>
                <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6fa7" />
                    <stop offset="50%" stopColor="#9b59b6" />
                    <stop offset="100%" stopColor="#3498db" />
                </linearGradient>
            </defs>
            <motion.circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="90 150"
                initial={{ strokeDashoffset: 0 }}
                animate={{
                    strokeDashoffset: [0, -75, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                }}
            />
        </motion.svg>
    );
};
