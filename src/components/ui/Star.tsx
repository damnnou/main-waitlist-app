import { motion } from "framer-motion";

export const Star = ({ size, bg }: { size?: number; bg?: boolean }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className={"relative p-2 flex items-center justify-center min-w-[42px] min-h-[42px] rounded-full" + (bg ? " bg-neutral-200" : "")}
    >
        {/* Звездочка */}
        <motion.svg
            width={size || 28}
            height={size || 28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-400"
        >
            <motion.path
                d="M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            />
        </motion.svg>
    </motion.div>
);
