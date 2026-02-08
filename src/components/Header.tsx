
import { useNavigate } from "@tanstack/react-router";
import { clearAuth, getAuthUser } from "@/utils/auth-guard";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { IoLogOutOutline } from "react-icons/io5";
import { useMenuEditor } from "@/context/MenuEditorContext";

export default function Header() {
  const navigate = useNavigate();
  const { editorTheme } = useMenuEditor();
  const [userName, setUserName] = useState<string>("");
  const [restaurant, setRestaurant] = useState<string>("");

  useEffect(() => {
    const user = getAuthUser();
    if (user?.name) {
      setUserName(user.name);
    }
    if (user?.restaurant_name) {
      setRestaurant(user.restaurant_name);
    }
  }, []);

  const handleLogout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    navigate({ to: "/Landing" });
  };

  return (
    <header className={`w-full ${editorTheme === "dark"
      ? "bg-slate-950"
      : "bg-slate-50"
      } top-0`}>

      <div className="relative max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left Section - Logo & Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40 cursor-pointer hover:shadow-xl hover:shadow-blue-500/50 transition duration-300"
          >
            <span className="text-white font-black text-xl">M</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              MenuMaker
            </h1>
            {restaurant && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xs font-semibold text-blue-600/70 mt-0.5 tracking-wide uppercase"
              >
                {restaurant}
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* Right Section - User Info & Logout */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5"
        >
          {userName && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden sm:flex flex-col items-end"
            >
              <span className={`text-sm font-bold ${editorTheme === 'dark' ? "text-slate-100" : "text-slate-900"}`}>
                {userName}
              </span>
              <span className={`text-xs font-medium ${editorTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mt-0.5`}>
                Restaurant Owner
              </span>
            </motion.div>
          )}

          {/* Divider */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-blue-300/40 to-transparent origin-center"
          />

          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl transition duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
          >
            <IoLogOutOutline size={16} className="font-bold" />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </header>
  );
}