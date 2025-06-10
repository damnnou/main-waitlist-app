import { motion } from "framer-motion";

export const WarningIcon = ({ size = 28, bg = false }: { size?: number; bg?: boolean }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className={"relative p-2 flex items-center justify-center min-w-[42px] min-h-[42px] rounded-full" + (bg ? " bg-neutral-200" : "")}
    >
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-500"
        >
            {/* Треугольник */}
            <motion.polygon
                points="12 2 22 20 2 20"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Восклицательный знак */}
            <motion.line
                x1="12"
                y1="8"
                x2="12"
                y2="13"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
            />
            <motion.circle
                cx="12"
                cy="17"
                r="0.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
            />
        </motion.svg>
    </motion.div>
);
