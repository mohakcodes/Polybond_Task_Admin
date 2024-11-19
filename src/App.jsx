import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardScreen from "./components/common/DashboardScreen";
import TaskScreen from "./components/common/TaskScreen";
import ProductionScreen from "./components/common/ProductionScreen";
import NotfoundScreen from "./components/common/NotfoundScreen";
import AuthRoute from "./components/AuthRoute";
import LoginScreen from "./components/common/LoginScreen";
import CalenderScreen from "./components/common/CalenderScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute />,
    children: [
      { index: true, element: <DashboardScreen /> },
      { path: "task", element: <TaskScreen /> },
      { path: "production", element: <ProductionScreen /> },
      { path: "calendar", element: <CalenderScreen /> },
    ],
  },
  { path: "/login", element: <LoginScreen /> },
  { path: "*", element: <NotfoundScreen /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;