import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginScreen from './common/LoginScreen';
import Header from './Header';
import Leftsidebar from "./Leftsidebar"
const AuthRoute = () => {
  const userId = useSelector((state) => state.user._id);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return <>
    <Header isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
    {userId ? <div className='flex'>
      <Leftsidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <Outlet />
    </div> : <LoginScreen />}</>;
};
export default AuthRoute