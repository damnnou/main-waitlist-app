import { motion } from "framer-motion";

export const Check = ({ size, bg }: { size?: number; bg?: boolean }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className={"relative p-2 flex items-center justify-center min-w-[42px] min-h-[42px] rounded-full" + (bg ? " bg-neutral-200" : "")}
    >
        {/* Галочка */}
        <motion.svg
            width={size || 28}
            height={size || 28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
        >
            <motion.path
                d="M5 12l5 5L20 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
            />
        </motion.svg>
    </motion.div>
);
