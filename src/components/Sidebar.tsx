import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  Users,
  MessageSquare,
  PieChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Calendar, label: "Calendar" },
  { icon: Users, label: "Team" },
  { icon: MessageSquare, label: "Messages" },
  { icon: PieChart, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className={cn(
        "h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700",
        "flex flex-col fixed left-0 top-0 z-40"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-gray-800 dark:text-white"
          >
            Projectify
          </motion.h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isCollapsed ? (
            <ChevronRight className="text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                  "hover:bg-gray-100 dark:hover:bg-gray-700  dark:text-white",
                  item.active &&
                    "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                )}
              >
                <item.icon size={20} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className={cn(
            "flex items-center space-x-3 w-full p-3 rounded-lg transition-colors",
            "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-medium"
            >
              Logout
            </motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );
}
