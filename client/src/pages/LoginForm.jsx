import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { loginUser } from "../actions/customerActions";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use useAuth hook

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(false);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email: email,
      password: password,
    };

    const response = await loginUser(userData);
    setLoading(false);

    if (response.success) {
      const { token, user } = response;
      localStorage.setItem("token", token);
      login(user);
      navigate("/");
    } else {
      setError(true);
      console.log("login front-end error");
    }
  };

  return (
    
    <div className="w-full h-5/6 flex flex-col md:flex-col lg:flex-row justify-center item-center  ">
      <div class="w-9%  mg:w-1/2 lg:w-1/2  object-cover rounded-lg overflow- bg-primary-lightblue">
        <img class="w-full h-full object-cover" src="store.jpg" alt="" />
      </div>

      <div className="w-9%  m-3 mg:w-35 lg:w-35 mt-10 mb-6 p-[3rem] bg-primary-bg rounded-lg shadow-md font-mono flex flex-col justify-center">
        <h2 className="text-3xl font-robottoblack mb-5 text-primary-darkblue">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="p-1 text-red-400">Incorrect email or password</p>
          )}
          <div className="mb-4 mt-4">
            <label className="block text-lg font-robottomed text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full px-3 py-2 font-robottomed border-2 rounded-md  border-primary-blue  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-lg font-robottomed text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-3 py-2 border-2 font-robottomed border-primary-blue  rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn larger my-2 "
          >
            {loading ? "Processing..." : "Login"}
          </button>
          <p className="mt-3 w-100 text-center  text-sm font-sans text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-md text-indigo-600 text-railregular">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
