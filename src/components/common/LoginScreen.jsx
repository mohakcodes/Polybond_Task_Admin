import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import api from "../axios/api";
import { loginFailure, loginSuccess } from "../redux/userSlice";
function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}staff/login`,
        {
          userId: username,
          password,
        }
      );
      dispatch(loginSuccess(response.data));
      Cookies.set("access_token", response.data.token);
      navigate("/", { replace: true });
    } catch (error) {
      console.log("Login Error => " + error);
      setError(error.response.data.message);
      dispatch(loginFailure());
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-20 max-w-4xl mx-auto">
        {/* Left Side Image/Illustration */}
        <div className="hidden md:block w-1/2">
          <img
            className="w-full h-auto"
            src="/assets/images/login.png"
            alt="Login"
            height="300"
          />
        </div>

        {/* Right Side Login Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            LOGIN
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                User Name
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  className="block w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-200"
                  placeholder="Enter your user name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-10 p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-center mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full p-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
