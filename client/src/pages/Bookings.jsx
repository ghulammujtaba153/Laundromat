// Bookings.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { FiEdit2 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";


const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${user._id}`
        );
        setBookings(res.data.bookings);
      } catch (error) {
        console.log("Error fetching bookings:", error.message);
      }
    };

    fetchBookings();
  }, [user._id]);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setNewDate(booking.selectedDate ? booking.selectedDate.split("T")[0] : "");
    setNewTime(booking.selectedTime ? booking.selectedTime : "");
    setModal(true);
  };

  const handleUpdateBooking = async () => {
    try {
      // Format the new date in ISO format
      const formattedDate = new Date(newDate).toISOString();
      console.log(formattedDate);
      const updateData = {
        _id: selectedBooking._id,
        newDate: formattedDate,
        newTime,
      };
      console.log(updateData);
      await axios.put("http://localhost:5000/api/update-booking", updateData);
      setModal(false);
      // Refresh bookings after updating
      const res = await axios.get(
        `http://localhost:5000/api/bookings/user/${user._id}`
      );
      setBookings(res.data.bookings);
    } catch (error) {
      console.error("Error updating booking:", error.message);
    }
  };

  return (
    <div className=" w-full px-4 bg-primary-bg">
      <h1 className="text-4xl sm:5xl md:5xl lg:text-6xl font-bold pt-8 mb-6 font-robottoblack text-center text-primary-darkblue">Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-lg flex items-center justify-center h-screen">
          No bookings available.
        </p>
      ) : (
        <div className="flex flex-row justify-center flex-wrap items-center gap-6 pb-24">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 w-350 rounded-lg shadow-lg my-2"
            >
              <div className="mb-4 ">
                <img
                  src={booking.picture}
                  alt={booking.itemName}
                  className="rounded-lg w-full h-[300px] object-contain"
                />
              </div>
              <div className="flex justify-between items-center font-raillight">
                <p className="text-lg font-semibold mb-2">{booking.itemName}</p>
                <FiEdit2
                  onClick={() => openModal(booking)}
                  size={20}
                  className="cursor-pointer hover:text-green-300"
                />
              </div>

              <p className="">Category: {booking.category}</p>
              <p>
                Date:{" "}
                {booking.selectedDate ? booking.selectedDate.split("T")[0] : ""}
              </p>

              <p>Time: {booking.selectedTime}</p>
              <p>Cycles: {booking.cycles}</p>
              <p>Total Price: {booking.price}</p>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4 ">
              <h2 className="text-2xl font-bold mr-6">Select Date and Time</h2>
              <RxCross2
                onClick={() => setModal(false)}
                size={24}
                className="hover:text-red-700 cursor-pointer rounded-lg"
              />
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-2">Date:</p>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="border w-full rounded-md px-4 py-1"
              />
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-2">Time:</p>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="border w-full  rounded-md px-4 py-1"
              />
            </div>
            <button
              onClick={handleUpdateBooking}
              className="btn larger my-2 "
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
