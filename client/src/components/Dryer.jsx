import React from "react";
import { useNavigate } from "react-router-dom";

const Dryer = ({ item }) => {
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate(`/items/${item._id}`);
  };
  return (
    <div
      onClick={handleItemClick}
      className="font-mono flex h-full m-2 w-150 md:w-350 lg:w-350 justify-center items-center flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
      >
      <img
        src={item.picture}
        alt="/"
        className="h-[295px] w-full object-contain  p-2 rounded-lg "
        />
         <p className="text-lg font-robotto pb-1 w-full text-center">{item.itemName}</p>
        <p className="text-md md:text-lg lg:text-lg font-robottomed  w-full text-center">Status : <span className="font-raillight">{item.status}</span></p>
        <p className="text-md md:text-lg lg:text-lg my-1 font-robottomed">Price : <span className="font-raillight">${item.price}</span></p>
    </div>
  );
};

export default Dryer;
