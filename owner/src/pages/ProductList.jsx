import axios from "axios";
import React, { useEffect, useState } from "react";
import LogOut from "../components/LogOut";

const ProductList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getitems");
        console.log(res.data.items);
        setItems(res.data.items);
      } catch (error) {
        console.log("Error while fetching items:", error.message);
      }
    };

    fetchItems();
  }, []);

  const handleChangeStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Available" ? "Not Available" : "Available";

    try {
      const res = await axios.put(
        `http://localhost:5000/api/${id}/change-status`,
        {
          newStatus: newStatus,
        }
      );

      if (res.data.success) {
        // Update the local items state
        const updatedItems = items.map((item) => {
          if (item._id === id) {
            return { ...item, status: newStatus };
          }
          return item;
        });

        setItems(updatedItems);
      } else {
        console.log("Failed to update item status");
      }
    } catch (error) {
      console.log("Error while updating item status:", error.message);
    }
  };

  return (
    <div className=" w-full backgroundimg">
      <div className="container80 ">
        <div className="relative md:w-55 lg:w-55 w-3/4 overflow-x-auto shadow-lg sm:rounded-lg mt-16">
          <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
          <thead className="text-xs font-robottomed text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Product name
                </th>
                <th scope="col" className="px-6 py-4">
                  Category
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b bg-primary-darkblue dark:border-gray-700 ${
                     "hover:bg-gray-50 dark:hover:bg-gray-400"}`}
                >
                  <th 
                    scope="row"
                    className="font-sans px-6 py-4 font-medium text-gray-900 bg-primary-darkblue whitespace-nowrap dark:text-white"
                  >
                    {item.itemName}
                  </th>
                  <td className=" font-robottomed px-6 py-4 font-railmedium text-md bg-primary-darkblue text-primary-bg">{item.category}</td>
                  <td className="font-robottomed  px-6 py-4 font-railmedium text-md bg-primary-darkblue  text-primary-bg" >{item.status}</td>
                  <td className="font-robottomed  px-6 py-4 font-railmedium text-md bg-primary-darkblue  text-primary-bg">{item.price}</td>
                  <td className="font-robottomed  px-6 py-4 font-railmedium text-md bg-primary-darkblue  text-primary-bg text-right">
                    <p
                      onClick={() => handleChangeStatus(item._id, item.status)}
                      className="font-sans text-md hover:text-green-500 dark:text-white-500  cursor-pointer"
                    >
                      Change Status
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <LogOut />
   </div>
  );
};

export default ProductList;
