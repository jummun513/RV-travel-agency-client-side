import { useContext, useEffect, useState } from "react";
import { AllContext } from "../../../layout/Main";
import { useParams } from "react-router-dom";
import './HotelDetails.css';
import { Rating } from "@mui/material";
import { BsImages, BsWifi2 } from 'react-icons/bs';
import { LiaSwimmerSolid } from 'react-icons/lia';
import { BiRestaurant } from 'react-icons/bi';
import { AiFillCar } from 'react-icons/ai';
import { Ri24HoursFill } from 'react-icons/ri';
import { CgGym } from 'react-icons/cg';
import { MdLocationOn } from 'react-icons/md';


const HotelDetails = () => {
    const { hotel } = useContext(AllContext);
    const { hotelId } = useParams();
    const [activeSection, setActiveSection] = useState(null);

    const singleHotel = hotel?.filter(item => (item.id === hotelId));
    // const forSmall = singleHotel.map(item => ((item.images).slice(0,3)));




    // scroll spy effect on navbar
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll(".section");

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const scrollPosition = window.scrollY;

                if (
                    scrollPosition >= sectionTop - 50 &&
                    scrollPosition < sectionTop + sectionHeight - 50
                ) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleNavClick = (sectionId) => {
        const section = document.getElementById(sectionId);

        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="bg-[#fbfbfb] pt-20 xxs:pt-32 xs:pt-40 xl:pt-48">
            <div className="rounded-md px-2 xxs:px-5 xs:px-0 mx-auto max-w-screen-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                {
                    singleHotel?.map((item, idx) => {
                        return (
                            <div key={idx}>
                                <div className="grid grid-cols-4 gap-1">
                                    {
                                        item.images.slice(0, 5).map((image, idx) => {
                                            return (
                                                <div key={idx} className={`${idx === 0 && 'col-span-2 row-span-2'}`}>
                                                    <div className={`cursor-pointer ${idx === 4 && 'relative'}`}>
                                                        <img src={image} alt="" />
                                                        {idx === 4 && <div className="absolute bg-gray-950 opacity-80 right-2 bottom-2 flex items-center justify-between p-4 rounded-2xl text-3xl text-gray-50"><BsImages className="w-8 h-8 me-4"></BsImages>{item.images.length - (idx + 1)}</div>}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <nav id="spy-navbar" className="navbar sticky top-[100px] pt-5 pb-3 shadow-sm mt-10 border border-slate-50 bg-[#fff] flex items-center justify-between">
                                        <ul className="space-x-5">
                                            <li className={`${activeSection === 'Overview' ? 'spy-nav-item-active' : 'spy-nav-item'}`}>
                                                <button className="py-2 text-gray-800 font-bold" onClick={() => handleNavClick("Overview")}>
                                                    Overview
                                                </button>
                                            </li>
                                            <li className={`${activeSection === 'Rooms' ? 'spy-nav-item-active' : 'spy-nav-item'}`}>
                                                <button className="py-2 text-gray-800 font-bold" onClick={() => handleNavClick("Rooms")}>
                                                    Rooms
                                                </button>
                                            </li>
                                            <li className={`${activeSection === 'Location' ? 'spy-nav-item-active' : 'spy-nav-item'}`}>
                                                <button className="py-2 text-gray-800 font-bold" onClick={() => handleNavClick("Location")}>
                                                    Location
                                                </button>
                                            </li>
                                            <li className={`${activeSection === 'Amenities' ? 'spy-nav-item-active' : 'spy-nav-item'}`}>
                                                <button className="py-2 text-gray-800 font-bold" onClick={() => handleNavClick("Amenities")}>
                                                    Amenities
                                                </button>
                                            </li>
                                            <li className={`${activeSection === 'Policies' ? 'spy-nav-item-active' : 'spy-nav-item'}`}>
                                                <button className="py-2 text-gray-800 font-bold" onClick={() => handleNavClick("Policies")}>
                                                    Policies
                                                </button>
                                            </li>
                                        </ul>
                                        <button className="btn btn-sm lg:btn-md text-gray-950 bg-primary hover:bg-secondary border-none">Book Now</button>
                                    </nav>
                                    <section id="Overview" className="section flex mt-5 bg-[#fff] px-5 py-5">
                                        <div className="w-1/2 text-gray-800">
                                            <h2 className="font-bold text-2xl">{item.heading}</h2>
                                            <Rating name="read-only" size="large" defaultValue={item.rating} precision={0.5} readOnly />
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                            <p className="text-gray-800 font-semibold my-5">8.8/10 Fabulous</p>
                                            <button className="btn btn-sm bg-transparent border-primary hover:bg-primary hover:border-secondary text-gray-900">See all reviews</button>
                                            <h3 className="mt-7 font-semibold mb-3 text-xl">Popular amenities</h3>
                                            <div className="grid grid-cols-2 gap-y-3">
                                                <div className="flex items-center">
                                                    <LiaSwimmerSolid className="h-8 w-8 me-2"></LiaSwimmerSolid>
                                                    <span>Pool</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <BsWifi2 className="h-8 w-8 me-2"></BsWifi2>
                                                    <span>Free WiFi</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <BiRestaurant className="h-8 w-8 me-2"></BiRestaurant>
                                                    <span>Restaurant</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <AiFillCar className="h-8 w-8 me-2"></AiFillCar>
                                                    <span>Free Parking</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <CgGym className="h-8 w-8 me-2"></CgGym>
                                                    <span>Gym</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Ri24HoursFill className="h-8 w-8 me-2"></Ri24HoursFill>
                                                    <span>24/7 Front desk</span>
                                                </div>
                                            </div>
                                            <button className="btn btn-sm bg-transparent border-primary hover:bg-primary hover:border-secondary text-gray-900 mt-5">See all</button>
                                        </div>
                                        <div className="w-1/2">
                                            <div>
                                                <iframe className='w-full h-full border-none border-2 rounded-lg' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59051.312105207224!2d91.73999934863278!3d22.326918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8b46373368d%3A0x7f0aa59b4138e5b3!2sHotel%20Agrabad!5e0!3m2!1sen!2sbd!4v1694972262735!5m2!1sen!2sbd" allowFullScreen loading="lazy"></iframe>
                                            </div>
                                            <p>Bulbul Center, 486/B O.R. Nizam Road, CDA Avenue, Chittagong, 4100</p>
                                            <button className="btn btn-sm bg-transparent border-primary hover:bg-primary hover:border-secondary text-gray-900 mt-5">See all</button>
                                            <h3>What&#39;s around</h3>
                                            <div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <MdLocationOn></MdLocationOn>
                                                        <span>Baitul Falah (Jamiatul Falah)</span>
                                                    </div>
                                                    <span>7 min drive</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section id="Rooms" className="section">

                                    </section>
                                    <section id="Location" className="section">

                                    </section>
                                    <section id="Amenities" className="section">

                                    </section>
                                    <section id="Policies" className="section">

                                    </section>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HotelDetails;