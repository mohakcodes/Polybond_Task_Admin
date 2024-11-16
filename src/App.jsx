import React from 'react'
import { Routes, Route } from "react-router-dom";
import DashboardScreen from './components/common/DashboardScreen';
import TaskScreen from './components/common/TaskScreen';
import ProductionScreen from './components/common/ProductionScreen';
import NotfoundScreen from './components/common/NotfoundScreen';
import AuthRoute from './components/AuthRoute';
import LoginScreen from './components/common/LoginScreen';
function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route index element={<DashboardScreen />} />
          <Route path="/task" element={<TaskScreen />} />
          <Route path="/production" element={<ProductionScreen />} />
        </Route>
        <Route path="*" element={<NotfoundScreen />} />
        {/* <Route path="/login" element={<LoginScreen />} /> */}
      </Routes>
    </>
  )
}

export default App