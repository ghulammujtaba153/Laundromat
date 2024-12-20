import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import upload from "../utils/UploadWidget";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [picLoading, setPicLoading] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  const handleProfilePictureChange = async (e) => {
    try {
      setPicLoading(true);
      const url = await upload(e.target.files[0]);
      setProfilePicture(url);
      console.log("image uploaded", url);
      setPicLoading(false);
    } catch (error) {
      console.log("image upload error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      password: password,
      profilePicture: profilePicture,
    };

    console.log(formData);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      console.log("Signup response:", response.data);
      navigate("/login");
    } catch (error) {
      setError(error.response);
      console.error("Signup error:", error.response);
      // Handle the error, such as showing an error message to the user
    }
  };

  return (
    <div className=" flex flex-col md:flex-col lg:flex-row justify-center gap-5">
      <div class="w-9%  lg:w-55 border-2 ml-5 border-grey-200 m-4 object-cover rounded-lg overflow-hidden shadow-lg">
      <img class="w-full h-full object-cover" src="machine.jpg" alt="" />
      </div>

      <div className="m-4 w-9% lg:w-35 mt-10 mb-6 p-[3rem] bg-primary-bg rounded-lg shadow-md font-mono">
        <h2 className="text-3xl font-robottoblack mb-5 text-primary-darkblue">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-400">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-lg font-robottomed text-black">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="mt-1 block w-full px-3 font-robottomed py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="User Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-robottomed text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full px-3 font-robottomed py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-robottomed text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-3 py-2 font-robottomed border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-robottomed text-black">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mt-1 block w-full px-3 font-robottomed py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {picLoading && <p className="">pic Loading...</p>}
          <button
            type="submit"
            className="btn larger my-2 "
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
          <p className="mt-3 text-md font-sans   text-gray-600 text-center">
            Already have an account?
            <Link to={"/login"} className="text-indigo-600 text-md font-railregular">
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
