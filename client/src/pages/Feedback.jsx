import React, { useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:5000/api/feedback", formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="container h-90vh flex flex-col md:flex-row lg:flex-row justify-around items-center gap-5">
      <div class="w-1/2 ml-12 m-4 object-cover rounded-lg overflow-hidden  bg-primary-lightblue">
        <img class="w-full h-full object-cover" src="feedback.jpg" alt="" />
      </div>
      <div className="w-3/4 m-4 md:w-35 lg:w-35 mx-auto mt-4 p-8 h-fit  bg-primary-bg rounded-lg shadow-md h-auto flex flex-col justify-center">
        {submitted ? (
          <p className="text-green-600">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg font-robottomed text-black mb-4"
              >
                Your Name:
              </label>
              <input
                type="text"
                placeholder="Enter your Name  "
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-2 rounded-md  border-primary-blue focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-lg font-robottomed text-black mb-4"
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter Your Reviews Here ..."
                value={formData.message}
                onChange={handleChange}
                className="mt-1 p-2 w-full shahow-md   border-2 rounded-md  border-primary-blue border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
                rows="7"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn larger my-2 shadow-md"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
