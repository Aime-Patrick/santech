"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ComponentProps } from "react";

export function MotionLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Link {...props}>{children}</Link>
    </motion.div>
  );
}
