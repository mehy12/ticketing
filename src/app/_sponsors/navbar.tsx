"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.nav
      className="bg-black/20 backdrop-blur-md sticky top-0 z-50 w-full py-4 px-6 flex items-center justify-between"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="text-2xl font-bold text-white">
        Sponsor Us
      </Link>
      <div className="space-x-4">
        <Link
          href="/"
          className="text-white hover:text-yellow-400 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/sponsor"
          className="text-white hover:text-yellow-400 transition-colors duration-200"
        >
          Sponsors
        </Link>
      </div>
    </motion.nav>
  );
};
