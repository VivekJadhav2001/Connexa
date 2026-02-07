'use client';

import { motion } from 'framer-motion'
import { Home, Users, MessageSquare, BarChart3, Settings, HelpCircle } from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab }) {
    const navItems = [
        { id: 'users', label: 'Users', icon: Users },
        { id: 'posts', label: 'Posts', icon: MessageSquare },
        { id: 'other', label: 'Analytics', icon: BarChart3 },
    ]

    const bottomItems = [
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'help', label: 'Help', icon: HelpCircle },
    ]

    return (
        <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="w-20 md:w-64 bg-card border-r border-border flex flex-col transition-all duration-300"
        >
            {/* Logo */}
            <div className="p-4 md:p-6 border-b border-border flex items-center justify-center md:justify-start">
                <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="hidden md:inline ml-3 font-semibold text-foreground">Community</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 md:p-6 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id

                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-primary text-black'
                                : 'text-foreground hover:bg-border/50'
                                }`}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className="hidden md:inline text-sm font-medium">{item.label}</span>
                        </motion.button>
                    )
                })}
            </nav>

            {/* Bottom Items */}
            <div className="p-4 md:p-6 border-t border-border space-y-2">
                {bottomItems.map((item) => {
                    const Icon = item.icon

                    return (
                        <motion.button
                            key={item.id}
                            whileHover={{ x: 4 }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-border/50 transition-colors"
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className="hidden md:inline text-sm font-medium">{item.label}</span>
                        </motion.button>
                    )
                })}
            </div>
        </motion.aside>
    )
}
