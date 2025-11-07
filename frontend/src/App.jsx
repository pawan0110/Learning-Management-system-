import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signUp.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import getCurrentUser from "./customHooks/getCurrentUser.js";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import { AuthRoute, PrivateRoute } from "./component/ProtectedRoutes.jsx";

export const serverUrl = "http://localhost:8080";

function App() {
  getCurrentUser();
  const { userData } = useSelector((store) => store.user);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route element={<AuthRoute />}>
          <Route
            path="/signup"
            element={!userData ? <SignUp /> : <Navigate to={"/"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
