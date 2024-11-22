import React from "react";
import {
  FileChartColumnIncreasing,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./redux/userSlice";
import Cookies from "js-cookie";
function Leftsidebar({ isCollapsed, setIsCollapsed }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    Cookies.remove("access_token");
    dispatch(logout());
    
  };
  return (
    <aside
      className={`bg-white border-r border-gray-200 ${
        isCollapsed ? "w-16" : "w-56"
      } p-3 transition-all duration-300 hidden sm:flex flex-col`}
    >
      <ul className="space-y-4">
        <Link
          to="/"
          className="flex items-center space-x-5 cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
          <LayoutDashboard className="w-5 h-5 text-black" />
          {!isCollapsed && (
            <span className="text-black font-medium text-base">Dashboard</span>
          )}
        </Link>
        <Link
          to="/task"
          className="flex items-center space-x-5 cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
          <FileChartColumnIncreasing className="w-5 h-5 text-black" />

          {!isCollapsed && (
            <span className="text-black font-medium text-base">Task</span>
          )}
        </Link>
        <Link
          to="/production"
          className="flex items-center space-x-5 cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
          <ShoppingCart className="w-5 h-5 text-black" />

          {!isCollapsed && (
            <span className="text-black font-medium text-base">Production</span>
          )}
        </Link>
        <Link
          to="/calendar"
          className="flex items-center space-x-5 cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
          <Calendar className="w-5 h-5 text-black" />

          {!isCollapsed && (
            <span className="text-black font-medium text-base">Calendar</span>
          )}
        </Link>
        <a
          onClick={() => handleLogout()}
          className="flex items-center space-x-5 cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
          <LogOut className="w-5 h-5 text-black" />

          {!isCollapsed && (
            <span className="text-black font-medium text-base">Logout</span>
          )}
        </a>
      </ul>
    </aside>
  );
}

export default Leftsidebar;