'use client';

import { motion } from 'framer-motion'
import { Search, Bell, Moon, User } from 'lucide-react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/themeSlice';

export default function Header() {
    const mode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    useEffect(() => {
        document.documentElement.classList.toggle("dark", mode === "dark");
    }, [mode]);
    return (
        <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            className="bg-card border-b border-border px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-40"
        >
            {/* Search */}
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
                <Search className="w-5 h-5 text-foreground/60" />
                <input
                    type="text"
                    placeholder="Search communities..."
                    className="bg-background border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder-foreground/40 outline-none focus:border-primary transition-colors w-full"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
                {/* Mobile Search */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="md:hidden p-2 hover:bg-border rounded-lg transition-colors"
                >
                    <Search className="w-5 h-5" />
                </motion.button>

                {/* Notifications */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-border rounded-lg transition-colors relative"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </motion.button>

                {/* Theme Toggle */}
                <motion.button
                    onClick={() => dispatch(toggleTheme())}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-border rounded-lg transition-colors"
                >
                    <Moon className="w-5 h-5" />
                </motion.button>

                {/* User Profile */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 ml-2 md:ml-4 pl-2 md:pl-4 border-l border-border"
                >
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-sm font-medium">Sai Narendra Tanniru</span>
                        <span className="text-xs text-foreground/60">Connexa</span>
                    </div>
                    <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center cursor-pointer">
                        <User className="w-5 h-5 text-white" />
                    </div>
                </motion.div>
            </div>
        </motion.header>
    )
}
