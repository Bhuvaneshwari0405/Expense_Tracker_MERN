import React, { useState, useContext } from "react";
import AuthLayout from "/src/components/layouts/AuthLayout.jsx";
import { useNavigate, Link } from "react-router-dom";
import Input from "/src/components/Inputs/input.jsx";
import { validateEmail } from "/src/utils/helper.js";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    setError("");

    //Login API call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if(token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    }
    catch (error) {
      if (error.response && error.response.data.message) {
        setError("Invalid email or password.");
      } else if (error.response && error.response.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Login</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Welcome back! Please login to your account.
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="E-mail"
            placeholder="abc@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 6 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <button type="submit" className="btn-primary">
            Login
          </button>
          <p className="text-xs text-slate-700 mt-4">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signUp">
              Sign Up here
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
