import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

import useUser from "../config/UseUser";
import Login from "./Login";
import { useLocation } from "wouter";

function Dashboard() {
  const [, navigate] = useLocation();
  const { isLogged, role } = useUser();
  console.log(isLogged);
  return (
    <>
      {isLogged ? (
        <div>{role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}</div>
      ) : (
        <div>{navigate("/login")}</div>
      )}
    </>
  );
}

export default Dashboard;
