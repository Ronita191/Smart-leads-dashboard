import { Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LeadDetails from "./pages/LeadDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
  path="/leads/:id"
  element={<LeadDetails />}
/>

      <Route
        path="/dashboard"
        element={
          localStorage.getItem("token")
            ? <App />
            : <Navigate to="/login" />
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}