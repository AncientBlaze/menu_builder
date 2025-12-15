
import { motion } from "motion/react";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="ml-4 text-2xl font-bold text-white">
            Menu Builder
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.9, y: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
            className="px-6 py-2 text-sm font-semibold text-gray-200 hover:text-white border border-gray-600 rounded-lg hover:border-cyan-400">
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.9, y: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
            className="px-6 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg">
            Register
          </motion.button>
        </div>
      </div>
    </header>
  )
}
