import React, { useState } from "react";
import { Link } from "react-router-dom";

const TabBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-row justify-between items-center bg-primary-darkblue px-12 py-4">
      <h1 className="text-3xl font-robottoblack text-white">
        Dry<span className="font-sans">Ease</span>
      </h1>
      <div className="relative sm:hidden">
        <button
          onClick={toggleDropdown}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          Menu
        </button>
        {isOpen && (
          <div className="z-10 absolute w-24 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Link
                to="/products"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/survillance"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Surveillance
              </Link>
              <Link
                to="addproduct"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Add Product
              </Link>
              <Link
                to="/feedback"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                FeedBack
              </Link>
            </div>
          </div>
        )}
      </div>
      <ul className="bg-primary-darkblue hidden text-sm font-robottomed text-center text-white sm:flex flex gap-8 text-black">
        <li className="bg-primary-darkblue w-full focus-within:z-10">
          <Link
            to="/products"
            className="px-2 text-xl border-b-2 border-transparent text-white hover:border-white transition-all duration-2000"
            aria-current="page"
          >
            Products
          </Link>
        </li>
        <li className="bg-primary-darkblue w-full focus-within:z-10">
          <Link
            to="/survillance"
            className="px-2 text-xl border-b-2 border-transparent text-white hover:border-white transition-all duration-2000"
            aria-current="page"
          >
            Surveillance
          </Link>
        </li>
        <li className="w-full focus-within:z-10">
          <Link
            to="addproduct"
            className="px-2 text-xl border-b-2 whitespace-nowrap border-transparent text-white hover:border-white transition-all duration-2000"
          >
            Add Product
          </Link>
        </li>
        <li className="w-full focus-within:z-10">
          <Link
            to="/feedback"
            className="px-2 text-xl border-b-2 border-transparent text-white hover:border-white transition-all duration-2000"
          >
            FeedBack
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TabBar;
