import { motion } from "motion/react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 backdrop-blur-sm lg:px-20"
    >
      <a
        href="https://jmthecreative.com"
        className="font-mono text-xs text-neutral-500 transition-colors hover:text-white"
      >
        ← jmthecreative.com
      </a>
    </motion.header>
  );
}
