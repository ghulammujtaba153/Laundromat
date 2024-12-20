import axios from "axios";
import React, { useEffect, useState } from "react";

const ItemsList = () => {
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
    <div className="max-w-7xl mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${
                  index % 2 === 0
                    ? "hover:bg-gray-50 dark:hover:bg-gray-600"
                    : ""
                }`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.itemName}
                </th>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4 text-right">
                  <p
                    onClick={() => handleChangeStatus(item._id, item.status)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
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
  );
};

export default ItemsList;
