import { useState } from "react";
import React from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFavorite, MdFeedback, MdHelp } from "react-icons/md";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiBook, BiLogIn } from "react-icons/bi";
import { useAuth } from "../AuthContext";
import { IoCallSharp } from "react-icons/io5";


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex mx-auto  py-6 px-10 items-center justify-between bg-primary-lightblue text-primary-front font-railmedium">
      <div className="flex items-center ">
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer md:py-1 md:hidden"
        >
          <AiOutlineMenu size={30} />
        </div>

        <h1 className="text-2xl px-4 sm:text-3xl lg:text-4xl text-primary-darkblue">
          <Link className="font-robottoblack" to="/">Dry<span className="font-sans">Ease</span></Link>
        </h1>
      </div>

      <div className="hidden md:flex gap-5 items-center font-robottomed">
        <p className="px-2 text-xl border-b-2 border-transparent hover:border-black transition-all duration-2000">
          <Link to={"/"}>Home</Link>
        </p>
        <p className="px-2 text-xl border-b-2 border-transparent hover:border-black transition-all duration-2000">
          <Link to={"/bookings"}>Bookings</Link>
        </p>
        <p className="px-2 text-xl border-b-2 border-transparent hover:border-black transition-all duration-2000">

          <Link to={"/feedback"}>FeedBack</Link>
        </p>

        {user ? (<p className="px-2 text-xl border-b-2 border-transparent hover:border-black transition-all duration-2000">

          <Link onClick={handleLogout}>Logout</Link>        </p>) : ""
        }        {user ? (
          <img
            onClick={() => setMenu(!menu)}
            className="w-12 h-12 ml-6 rounded-lg cursor-pointer"
            src={user.profilePicture}
            alt="Profile Picture"
          />
        ) : (
          <p className="px-2 text-xl border-b-2 border-transparent hover:border-black transition-all duration-2000">

            <Link to="/login">Login</Link>
          </p>
        )}
        {!user && <p className="ml-8 px-6 py-2 text-xl text-white bg-primary-darkblue border-r-6 shadow-lg rounded-lg flex flex-row  items-center">
          <IoCallSharp className="mr-2" />
          <Link to={""}>(704)555-0127</Link>
        </p>}
        {/* {menu ? (
          <div className="absolute mt-[80px] bg-slate-50 p-2 rounded-md right-2 z-10">
            <Link onClick={handleLogout}>Logout</Link>
          </div>
        ) : (
          ""
        )} */}
      </div>

      {/* Mobile menu*/}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen top-0 left-0 z-10"></div>
      ) : (
        ""
      )}

      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />

        <h2 className="text-2xl p-4">Laundary</h2>
        <div className="flex items-center p-4 border-b-2 mx-3 text-center">
          {user && (
            <img
              onClick={() => setMenu(!menu)}
              className="w-10 h-10 rounded cursor-pointer"
              src={user.profilePicture}
              alt="Profile Picture"
            />
          )}
          {user && <p className="ml-2 text-xl font-robotto">{user.name}</p>}
        </div>

        <nav>
          <ul className="flex flex-col  text-gray font-robottomed">

            <li className="text-md py-4  pl-4 flex font-robottomed">
              <MdFeedback size={30} className="mr-4" />
              <Link className="navbutttons" to={"/feedback"}>FeedBack</Link>
            </li>
            <li className="text-md py-4 pl-4  flex">
              <BiBook size={30} className="mr-4" />
              <Link className="navbutttons" to={"/bookings"}>Bookings</Link>
            </li>
            <li className="text-md py-4 pl-4  flex">
              <BiLogIn size={30} className="mr-4" />
              {user ? (
                <Link className="navbutttons" onClick={handleLogout}>Logout</Link>
              ) : (
                <Link className="navbutttons" to={"/login"}>Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
