import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Navbar';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import EmployeeList from './components/Employee/EmployeeList';
import EmployeeDetails from './components/Employee/EmployeeDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={
        <>
          <Menu />
          <Dashboard />
        </>
      } />
      <Route path="/list" element={
        <>
          <Menu />
          <EmployeeList />
        </>
      } />
      <Route path="/list/:id" element={
        <>
          <Menu />
          <EmployeeDetails />
        </>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
