import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from 'react-router-dom';

const ItemDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [cycles, setCycles] = useState(1);
  const [totalPrice, setTotalPrice] = useState(item.price);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/item/${id}`);
        setItem(res.data.item);
        setTotalPrice(res.data.item.price);
      } catch (error) {
        console.log("Error while fetching items:", error.message);
      }
    };
    fetchDetails();
  }, [id]);

  const incrementQuantity = () => {
    setCycles(cycles + 1);
    setTotalPrice(item.price * (cycles + 1));
  };

  const decrementQuantity = () => {
    if (cycles > 1) {
      setCycles(cycles - 1);
      setTotalPrice(item.price * (cycles - 1));
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleBooking = async () => {
    const bookingData = {
      userId: user._id,
      itemName: item.itemName,
      picture: item.picture,
      category: item.category,
      price: totalPrice,
      status: item.status,
      selectedDate,
      selectedTime,
      cycles,
    };
    setLoading(true);

    try {
      const bookingRes = await axios.post(
        "http://localhost:5000/api/booking",
        bookingData
      );
      setLoading(false);

      if (bookingRes.data.success) {
        const paymentRes = await makePayment(bookingRes.data.booking);

        console.log(paymentRes);
        if (paymentRes.status === 303) {
          // If the response is a redirect, the user will be redirected to the Stripe Checkout page
          window.location.href = bookingRes.headers.location;
        } else {
          console.error(
            "Failed to create checkout session:",
            paymentRes.data.error
          );
        }
      } else {
        console.error("Booking creation failed:", bookingRes.data.error);
      }
    } catch (error) {
      console.error("Error creating booking:", error.message);
    }
  };

  const makePayment = async (paymentDetails) => {
    console.log(paymentDetails);
    try {
      const stripe = await loadStripe(
        "pk_test_51P8yYd04fPwTFwVRutBvicQTrs0J0NhSFWAbjTTYWfyjDsRp8jiXowfTkacwJbakyVfOGNC4ZeAXE7gdfGsY0xSq00m0ui2aXB"
      );

      const session = await axios.post(
        "http://localhost:5000/api/create-checkout-session",
        paymentDetails
      );
      console.log(session);

      const result = await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });

      if (result.error) {
        console.error("Error making payment:", result.error.message);
        return { success: false, error: result.error.message };
      } else {
        console.log("Payment successful:", result);
        return { success: true, message: "Payment successful" };
      }
    } catch (error) {
      console.error("Error making payment:", error.message);
      return { success: false, error: error.message };
    }
  };

  return (
    <div className="backgroundimages w-full h-screen mx-auto px-8 ">
      <div className=" max-w-3xl mx-auto mt-10 p-8 pt-10 px-10 bg-primary-lightblue rounded-lg shadow-lg mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4xl font-bold font-robotto">{item.itemName}</h2>
          <p className="text-xl font-semibold font-robotto bg-white px-4 py-1 rounded-lg shadow-md">${totalPrice}</p>
        </div>
        <div className="mb-4">
          <img
            src={item.picture}
            alt={item.itemName}
            className="rounded-lg h-[295px] w-full object-contain"
          />
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Status: <span className="font-robotto"> {item.status}</span></p>
        </div>
        {user && <>
          <div className="flex items-center mb-4">
            <p className="text-lg font-semibold mr-4">Cycles:</p>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="bg-gray-200 text-2xl text-black hover:bg-gray-300 rounded-full px-4 py-1 mr-2 flex justify-center align-center"
              >
                -
              </button>
              <p>{cycles}</p>
              <button
                onClick={incrementQuantity}
                className="bg-gray-200 text-2xl text-black hover:bg-gray-300 rounded-full px-3 py-1 ml-2 flex justify-center align-center"
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-4 ">
            <label htmlFor="date" className="block text-lg font-semibold mb-2">
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-lg font-semibold mb-2">
              Select Time:
            </label>
            <input
              type="time"
              id="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </>}

        <div className="text-center">
          {user ?

            <button
              onClick={handleBooking}
              className="btn"
            >
              {loading ? "loading..." : "Book"}
            </button>
            :
            <Link to={'/signup'}>
              <button className="btn">

                Sign Up for Free</button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
