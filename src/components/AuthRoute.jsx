import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoginScreen from "./common/LoginScreen";
import Header from "./Header";
import Leftsidebar from "./Leftsidebar";
import { validateAccessToken } from "./utils/checkToken.js";

const AuthRoute = () => {

  const navigate = useNavigate();
  const userId = useSelector((state) => state.user._id);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(()=>{
    const validate = () => {
      const isValid = validateAccessToken();
      if(!isValid){
        navigate("/login");
      }
    }
    validate();
    const intervalID = setInterval(validate, 5000);
    return () => clearInterval(intervalID);
  },[]);

  return (
    <>
      {userId && (
        <Header
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      )}
      {userId ? (
        <div className="flex">
          <Leftsidebar
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
          <Outlet />
        </div>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};

export default AuthRoute;
