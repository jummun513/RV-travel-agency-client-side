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
import { MdLocationOn, MdOutlineFlight } from 'react-icons/md';
import Room from "./Room/Room";
import { AiOutlineClose, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useQuery } from "react-query";
import fetchData from "../../../fetchData";


const HotelDetails = () => {
    const { setLockBody } = useContext(AllContext);
    const { hotelId } = useParams();
    const [activeSection, setActiveSection] = useState(null);

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

    // open slider to show full image
    const [slideNumber, setSlideNumber] = useState(0);
    const [openSlide, setOpenslide] = useState(false);
    const handleSlideOpen = (i) => {
        setSlideNumber(i);
        setOpenslide(true);
        setLockBody(true);
    }
    const handleSlideClose = () => {
        setOpenslide(false);
        setLockBody(false);
    }
    const handleMoveSlide = (i) => {
        let newSlideNumber;
        const length = singleHotel.map(i => i.images.length)
        if (i === 'l') {
            newSlideNumber = slideNumber === 0 ? (length[0] - 1) : (slideNumber - 1);
        }
        else {
            newSlideNumber = slideNumber === (length[0] - 1) ? 0 : (slideNumber + 1);
        }
        setSlideNumber(newSlideNumber);
    }

    // data fetch
    const { data, isLoading } = useQuery("hotelsData", () => fetchData('https://raw.githubusercontent.com/jummun513/RV-travel-agency-client-side/31017727c2ee11663513dba19d405a8c2d24f934/public/hotelData.json'));
    if (isLoading) {
        return <div className='text-4xl text-gray-500'> Loading...</div>
    }
    // filter the demand data of hotel via id
    const singleHotel = (data?.filter(item => (item.id === hotelId)));

    return (
        <div>
            {
                openSlide &&
                <div id="container" className="px-1 xxs:px-2 lg:px-4 absolute top-0 left-0 z-20 bg-[#000000b9] h-[100vh] w-full flex items-center justify-center duration-1000 ease-linear">
                    {
                        singleHotel?.map((item, idx) => {
                            return (
                                <div key={idx} className="flex items-center justify-center">
                                    <AiOutlineClose onClick={handleSlideClose} className="absolute right-5 top-5 bg-[#fff] w-6 h-6 p-1 xl:w-10 xl:h-10 4xl:w-16 4xl:h-16 4xl:p-4  text-gray-950 xl:p-2 rounded-full cursor-pointer"></AiOutlineClose>
                                    <AiOutlineArrowLeft onClick={() => handleMoveSlide('l')} className="bg-[#fff] w-6 h-6 p-1 xl:w-10 xl:h-10 4xl:w-16 4xl:h-16 4xl:p-4  text-gray-950 xl:p-2 rounded-full cursor-pointer"></AiOutlineArrowLeft>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img className="w-[95%] h-[full] xl:w-[85%] xl:h-[80vh] 2xl:w-[90%] 2xl:h-[90vh] xl:mx-4 2xl:mx-5" loading="lazy" src={item.images[slideNumber]} alt="Slider Image" />
                                    </div>
                                    <AiOutlineArrowRight onClick={() => handleMoveSlide('r')} className="bg-[#fff] w-6 h-6 p-1 xl:w-10 xl:h-10 4xl:w-16 4xl:h-16 4xl:p-4  text-gray-950 xl:p-2 rounded-full cursor-pointer"></AiOutlineArrowRight>
                                </div>
                            )
                        })
                    }
                </div>
            }
            <div className="bg-[#fbfbfb] pt-20 xxs:pt-32 xs:pt-36 xl:pt-48">
                <div className="rounded-md px-2 xxs:px-3 xs:px-5 md:px-7 lg:px-10 mx-auto max-w-screen-4xl">
                    {
                        singleHotel?.map((item, idx) => {
                            return (
                                <div key={idx}>
                                    {/* for large device */}
                                    <div className="hidden lg:grid grid-cols-4 gap-1">
                                        {
                                            item.images.slice(0, 5).map((image, idx) => {
                                                return (
                                                    <div onClick={() => { handleSlideOpen(idx) }} key={idx} className={`cursor-pointer ${idx === 0 && 'col-span-2 row-span-2'}`}>
                                                        <div className={`${idx === 4 && 'relative'}`}>
                                                            <img src={image} alt="" />
                                                            {idx === 4 && <div className="absolute bg-gray-950 opacity-80 right-2 bottom-2 flex items-center justify-between p-3 2xl:p-4 rounded-xl 2xl:rounded-2xl text-2xl 2xl:text-3xl text-gray-50"><BsImages className="w-6 h-6 me-3 2xl:w-8 2xl:h-8 2xl:me-4"></BsImages>{item.images.length - (idx + 1)}</div>}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {/* for medium device */}
                                    <div className="hidden xs:grid lg:hidden grid-cols-3 gap-1">
                                        {
                                            item.images.slice(0, 3).map((image, idx) => {
                                                return (
                                                    <div onClick={() => { handleSlideOpen(idx) }} key={idx} className={`cursor-pointer ${idx === 0 && 'col-span-2 row-span-2'}`}>
                                                        <div className={`${idx === 2 && 'relative'}`}>
                                                            <img src={image} alt="" />
                                                            {idx === 2 && <div className="absolute bg-gray-950 opacity-80 right-2 bottom-2 flex items-center justify-between p-2 md:p-4 rounded-xl md:rounded-2xl text-2xl md:text-3xl text-gray-50"><BsImages className="w-6 h-6 me-2 md:w-8 md:h-8 md:me-4"></BsImages>{item.images.length - (idx + 1)}</div>}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {/* for small device */}
                                    <div className="xs:hidden">
                                        {
                                            item.images.slice(0, 1).map((image, idx) => {
                                                return (
                                                    <div onClick={() => { handleSlideOpen(idx) }} key={idx} className={`cursor-pointer ${idx === 0 && 'col-span-2 row-span-2'}`}>
                                                        <div className={`${idx === 0 && 'relative'}`}>
                                                            <img src={image} alt="" />
                                                            {idx === 0 && <div className="absolute bg-gray-950 opacity-80 right-2 bottom-2 flex items-center justify-between p-2 xxs:p-3 rounded-xl text-xl xxs:text-2xl text-gray-50"><BsImages className="xxs:w-7 xxs:h-7 xxs:me-3 w-6 h-6 me-2"></BsImages>{item.images.length - (idx + 1)}</div>}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>






                                    <div className="hidden">
                                        <nav id="spy-navbar" className="navbar sticky xl:top-[95px] 3xl:top-[101px] z-[11] py-5 shadow-sm mt-20 border border-slate-50 bg-[#fff] flex items-center justify-between">
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
                                        <section id="Overview" className="section flex mt-10 bg-[#fff] px-5 py-10">
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
                                                <p className="text-sm text-gray-700 mt-3">Bulbul Center, 486/B O.R. Nizam Road, CDA Avenue, Chittagong, 4100</p>
                                                <button className="btn btn-sm bg-transparent border-primary hover:bg-primary hover:border-secondary text-gray-900 mt-5 mb-5">View in map</button>
                                                <h3 className="text-gray-800 font-semibold text-xl mb-3">What&#39;s around</h3>
                                                <div>
                                                    <div className="flex justify-between items-center text-gray-800">
                                                        <div className="flex items-center">
                                                            <MdLocationOn className="h-8 w-8 me-3"></MdLocationOn>
                                                            <span>Baitul Falah (Jamiatul Falah)</span>
                                                        </div>
                                                        <span>3 min drive</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-gray-800 mt-3">
                                                        <div className="flex items-center">
                                                            <MdLocationOn className="h-8 w-8 me-3"></MdLocationOn>
                                                            <span>Shishu Park</span>
                                                        </div>
                                                        <span>3 min walkway</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-gray-800 mt-3">
                                                        <div className="flex items-center">
                                                            <MdLocationOn className="h-8 w-8 me-3"></MdLocationOn>
                                                            <span>Zia Memorial Museum</span>
                                                        </div>
                                                        <span>5 min walkway</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-gray-800 mt-3">
                                                        <div className="flex items-center">
                                                            <MdOutlineFlight className="h-8 w-8 me-3"></MdOutlineFlight>
                                                            <span>Chittagong (CGP-Shah Amanat Intl.)</span>
                                                        </div>
                                                        <span>7 min drive</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section id="Rooms" className="hidden section mt-20 bg-[#fff] px-5 py-10">
                                            <h2 className="text-gray-800 text-2xl font-medium mb-5">Choose your room</h2>
                                            <div className="grid grid-cols-3 place-items-center">
                                                {
                                                    item.rooms.map((r, i) => <Room key={i} data={r}></Room>)
                                                }
                                            </div>
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
        </div>
    );
};

export default HotelDetails;