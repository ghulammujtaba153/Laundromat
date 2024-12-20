import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import { GiWashingMachine } from "react-icons/gi";
import { BiSolidDryer } from "react-icons/bi";
import WashingMachines from "../components/WashingMachines";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Dryer from "../components/Dryer";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from "../AuthContext";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [items, setItems] = useState([]);
  const [washingMachines, setWashingMachines] = useState([]);
  const [dryers, setDryers] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getitems");
        const fetchedItems = res.data.items;
        setItems(fetchedItems);

        // Filter items based on category
        const washingMachinesFiltered = fetchedItems.filter(
          (item) => item.category === "Washing Machine"
        );
        setWashingMachines(washingMachinesFiltered);

        const dryersFiltered = fetchedItems.filter(
          (item) => item.category === "Dryer"
        );
        setDryers(dryersFiltered);
      } catch (error) {
        console.log("Error while fetching items:", error.message);
      }
    };

    fetchItems();
  }, []);
  const { user } = useAuth();


  return (
    <>
      <div className="w-full h-80vh relative overflow-hidden font-mono bg-primary-lightblue">
        <div className="homepagetop">
          <div className="homepagetopleft">
            <h1 className="h1 font-robottoblack  ">Singapore's First Choice in Dry Cleaning</h1>
            <p className="text-md font-raillight mt-6 pl-2 ">A traditional of unsurpassed customer service and unwavering commitment to high quality dry cleaning and laundary services for over 100 years</p>
            <div className=" text-center">

              {!user &&
                <Link to={'/signup'}>
                  {/* <button className="btn shadow-lg">
                    Sign Up for Free</button> */}

                  <div className="btn-container mt-4">
                    <a className="btn-content" href="#">
                      <span className="btn-title">Sign Up for Free</span>
                      <span className="icon-arrow">
                        <svg
                          width="66px"
                          height="43px"
                          viewBox="0 0 66 43"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path
                              id="arrow-icon-one"
                              d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              id="arrow-icon-two"
                              d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              id="arrow-icon-three"
                              d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </a>
                  </div>
                </Link>}
            </div>
          </div>

          <div className="homepagetopimage">

            <img
              src="man.png"
              alt="Slide 1"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col p-20 justify-center items-center bg-custom-gradient ">
        <h1 className="font-bold text-4xl sm:5xl md:5xl lg:text-7xl font-robottoblack text-white">Welcome to Our Laundry Service</h1>
        <p className="m-4 mt-12 lg:text-2xl  font-sans text-center text-primary-bg">
          At our laundry service, we understand the importance of clean clothes
          and the convenience of modern appliances. We offer top-notch washing
          machine and dryer services to make laundry day a breeze for you.
          Whether it's your favorite clothes that need gentle care or heavy-duty
          fabrics that require a thorough clean, our machines are here to
          deliver outstanding results.
        </p>

        <div className="flex justify-center items-center md:flex-row flex-row">
          <div className="flex justify-center w-150 lg:w-250 items-center m-4 flex-col px-5 py-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
            <GiWashingMachine size={160} className="text-primary-darkblue" />
            <p className="mt-4 text-sm lg:text-lg font-semibold font-robottoblack text-primary-darkblue">Washing Machine</p>
          </div>
          <div className="flex justify-center lg:w-250 items-center flex-col px-5 py-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
            <BiSolidDryer size={160} className="text-primary-darkblue" />
            <p className="mt-4 text-sm lg:text-lg font-semibold font-robottoblack text-primary-darkblue">Dryers</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-primary-lightblue pt-8">
        <div className="w-full h-28 bg-primary-lightblue flex justify-center items-center">
          <p className="font-bold m-3 mt-5 py-6  text-4xl sm:5xl md:5xl lg:text-6xl text-primary-darkblue font-robottoblack">Washing Machines</p>
        </div>
        <Carousel
          className=" bg-primary-lightblue pb p-10 px-7"
          responsive={responsive}
          draggable={false}
          swipeable={true}
          centerMode={true}
          showDots={false}
          infinite={true}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          containerClass="carousel-container"
        >
          {washingMachines.map((item, index) => (
            <WashingMachines className="w-250 bg-black" item={item} key={index} />
          ))}
        </Carousel>
      </div>

      <div className="flex flex-col bg-primary-bg ">
        <div className="w-full h-28 bg-primary-lightblue flex justify-center items-center">
          <p className="font-bold m-3 text-4xl sm:5xl md:5xl lg:text-6xl text-primary-darkblue font-robottoblack">Dryers</p>
        </div>
        <Carousel
          className=" bg-primary-lightblue pb-10 px-7"
          responsive={responsive}
          draggable={false}
          swipeable={true}
          centerMode={true}
          showDots={false}
          infinite={true}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          containerClass="carousel-container"
        >
          {dryers.map((item, index) => (
            <Dryer item={item} key={index} />
          ))}
        </Carousel>
      </div>
      <Footer />
    </>
  );
};

export default Home;
