import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "email@gmail.com" && password === "password") {
      navigate("/products");
    } else {
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="container flex flex-col md:flex-row lg:flex-row p-12 items-center gap-3 back">
      <div class="w-70  m-4 object-cover rounded-lg overflow-hidden shadow-lg ">
        <img class="w-full h-full object-cover" src="admin.jpg" alt="" />
      </div>
      <div className="md:w-35 lg:w-35 w-3/4  mt-10 mb-6 p-[3rem] bg-primary-bg rounded-lg shadow-md font-mono ">
        <h2 className="text-5xl pb-4  font-robotto mb-5 text-primary-darkblue">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
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
          <button type="submit" className="btn larger my-2 ">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
