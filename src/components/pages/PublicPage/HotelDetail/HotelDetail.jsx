import './HotelDetail.css';
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AllContext } from "../../../../layout/Main/Main";
import fetchData from "../../../../functions/fetchData";
import { Rating } from "@mui/material";
import { BsImages, BsWifi2 } from 'react-icons/bs';
import { LiaSwimmerSolid } from 'react-icons/lia';
import { BiRestaurant } from 'react-icons/bi';
import { AiFillCar, AiFillStar } from 'react-icons/ai';
import { Ri24HoursFill } from 'react-icons/ri';
import { CgGym } from 'react-icons/cg';
import { MdLocationOn, MdOutlineFlight } from 'react-icons/md';
import { AiOutlineClose, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Room from "./Room/Room";
import { ImPointRight } from 'react-icons/im';
import { TiTick } from 'react-icons/ti';
import { Helmet } from 'react-helmet-async';


const HotelDetail = () => {
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
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };
        scrollToTop();
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
    const { data, isLoading } = useQuery("hotelsData", () => fetchData('../../../../../public/hotelData.json'));
    if (isLoading) {
        return <div className='text-4xl text-gray-500'> Loading...</div>
    }
    // filter the demand data of hotel via id
    const singleHotel = (data?.filter(item => (item.id === hotelId)));

    return (
        <div className="bg-[#fbfbfb] py-20 xxs:py-32 xs:py-36 md:py-40 xl:py-48 3xl:py-56">
            <Helmet>
                <title>Individual Hotel - Royal Venture Limited</title>
            </Helmet>
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
                                                <div onClick={() => handleSlideOpen(idx)} key={idx} className={`cursor-pointer ${idx === 0 && 'col-span-2 row-span-2'}`}>
                                                    <div className={`${idx === 4 && 'relative'}`}>
                                                        <img loading='lazy' src={image} alt="" />
                                                        {idx === 4 && <div className="absolute bg-gray-950 opacity-80 right-2 bottom-2 flex items-center justify-between p-3 2xl:p-4 rounded-xl 2xl:rounded-2xl text-2xl 2xl:text-3xl text-gray-50"><BsImages className="w-6 h-6 me-3 2xl:w-8 2xl:h-8 2xl:me-4"></BsImages>{item.images.length - (idx + 1)}+</div>}
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
                                                <div onClick={() => handleSlideOpen(idx)} key={idx} className={`cursor-pointer ${idx === 0 && 'col-span-2 row-span-2'}`}>
                                                    <div className={`${idx === 2 && 'relative'}`}>
                                                        <img loading='lazy' src={image} alt="" />
                                                        {idx === 2 && <div className="absolute bg-gray-950 opacity-80 right-2 bottom-2 flex items-center justify-between p-2 md:p-4 rounded-xl md:rounded-2xl text-2xl md:text-3xl text-gray-50"><BsImages className="w-6 h-6 me-2 md:w-8 md:h-8 md:me-4"></BsImages>{item.images.length - (idx + 1)}+</div>}
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
                                                <div onClick={() => handleSlideOpen(idx)} key={idx} className={`cursor-pointer ${idx === 0 && 'col-span-2 row-span-2'}`}>
                                                    <div className={`${idx === 0 && 'relative'}`}>
                                                        <img loading='lazy' src={image} alt="" />
                                                        {idx === 0 && <div className="absolute bg-gray-950 opacity-80 right-2 bottom-2 flex items-center justify-between p-2 xxs:p-3 rounded-xl text-xl xxs:text-2xl text-gray-50"><BsImages className="xxs:w-7 xxs:h-7 xxs:me-3 w-6 h-6 me-2"></BsImages>{item.images.length - (idx + 1)}+</div>}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>



                                <div>
                                    <nav id="spy-navbar" className="navbar sticky top-[42px] xxs:top-[62px] lg:top-[72px] xl:top-[95px] 3xl:top-[101px] z-[11] py-3 xl:py-5 shadow-sm mt-12 md:mt-10 lg:mt-16 xl:mt-20 border border-slate-50 bg-[#fff] flex flex-col xs:flex-row items-center justify-between">
                                        <ul className="flex flex-wrap space-x-2 xxs:space-x-5">
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
                                            <li className={`${activeSection === 'About' ? 'spy-nav-item-active' : 'spy-nav-item'}`}>
                                                <button className="py-2 text-gray-800 font-bold" onClick={() => handleNavClick("About")}>
                                                    About
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
                                        <button className="btn btn-xs sm:btn-sm lg:btn-md mt-2 xs:mt-0 text-gray-950 bg-primary hover:bg-secondary border-none">Book Now</button>
                                    </nav>
                                    <section id="Overview" className="section lg:flex mt-8 sm:mt-5 lg:mt-10 bg-[#fff] px-1 xxs:px-2 xs:px-5 py-7 xxs:py-10">
                                        <div className="lg:w-1/2 text-gray-800">
                                            <h2 className="text-lg font-bold xs:text-2xl 2xl:text-4xl">{item.heading}</h2>
                                            <Rating name="read-only" size="large" defaultValue={item.rating} precision={0.5} readOnly />
                                            <p className="text-xs xs:text-sm text-gray-600">{item.desc}</p>
                                            <p className="text-gray-800 font-semibold my-3 xs:my-5">8.8/10 Fabulous</p>
                                            <button className="btn btn-xs xs:btn-sm bg-transparent border-primary hover:bg-primary hover:border-secondary text-gray-900">See all reviews</button>
                                            <h3 className="mt-7 font-semibold mb-3 text-base xs:text-xl">Popular amenities</h3>
                                            <div className="grid grid-cols-2 gap-y-3">
                                                <div className="flex items-center">
                                                    <LiaSwimmerSolid className="xs:h-8 xs:w-8 h-6 w-6 me-2"></LiaSwimmerSolid>
                                                    <span>Pool</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <BsWifi2 className="xs:h-8 xs:w-8 h-6 w-6 me-2"></BsWifi2>
                                                    <span>Free WiFi</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <BiRestaurant className="xs:h-8 xs:w-8 h-6 w-6 me-2"></BiRestaurant>
                                                    <span>Restaurant</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <AiFillCar className="xs:h-8 xs:w-8 h-6 w-6 me-2"></AiFillCar>
                                                    <span>Free Parking</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <CgGym className="xs:h-8 xs:w-8 h-6 w-6 me-2"></CgGym>
                                                    <span>Gym</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Ri24HoursFill className="xs:h-8 xs:w-8 h-6 w-6 me-2"></Ri24HoursFill>
                                                    <span>24/7 Front desk</span>
                                                </div>
                                            </div>
                                            <button className="btn btn-xs xs:btn-sm bg-transparent border-primary hover:bg-primary hover:border-secondary text-gray-900 mt-5">See all</button>
                                        </div>
                                        <div className="lg:w-1/2 mt-14 lg:mt-0">
                                            <div>
                                                <iframe className='w-full h-full border-none border-2 rounded-lg' src={item.location.map} allowFullScreen loading="lazy"></iframe>
                                            </div>
                                            <p className="text-xs xs:text-sm text-gray-700 mt-2 xs:mt-3">Bulbul Center, 486/B O.R. Nizam Road, CDA Avenue, Chittagong, 4100</p>
                                            <button className="btn btn-xs xs:btn-sm bg-transparent border-primary hover:bg-primary hover:border-secondary text-gray-900 xs:mt-5 mt-2 mb-8 xs:mb-5">View in map</button>
                                            <h3 className="text-gray-800 font-semibold text-base xs:text-xl mb-3">What&#39;s around</h3>
                                            <div>
                                                <div className="flex justify-between items-center text-gray-800">
                                                    <div className="flex items-center">
                                                        <MdLocationOn className="xs:h-8 xs:w-8 xs:me-3 h-6 w-6 me-1"></MdLocationOn>
                                                        <span>Baitul Falah (Jamiatul Falah)</span>
                                                    </div>
                                                    <span className='ms-2 xxs:ms-0 text-end'>3 min drive</span>
                                                </div>
                                                <div className="flex justify-between items-center text-gray-800 mt-3">
                                                    <div className="flex items-center">
                                                        <MdLocationOn className="xs:h-8 xs:w-8 xs:me-3 h-6 w-6 me-1"></MdLocationOn>
                                                        <span>Shishu Park</span>
                                                    </div>
                                                    <span className='ms-2 xxs:ms-0 text-end'>3 min walkway</span>
                                                </div>
                                                <div className="flex justify-between items-center text-gray-800 mt-3">
                                                    <div className="flex items-center">
                                                        <MdLocationOn className="xs:h-8 xs:w-8 xs:me-3 h-6 w-6 me-1"></MdLocationOn>
                                                        <span>Zia Memorial Museum</span>
                                                    </div>
                                                    <span className='ms-2 xxs:ms-0 text-end'>5 min walkway</span>
                                                </div>
                                                <div className="flex justify-between items-center text-gray-800 mt-3">
                                                    <div className="flex items-center">
                                                        <MdOutlineFlight className="xs:h-8 xs:w-8 xs:me-3 h-6 w-6 me-1"></MdOutlineFlight>
                                                        <span>Chittagong (CGP-Shah Amanat Intl.)</span>
                                                    </div>
                                                    <span className='ms-2 xxs:ms-0 text-end'>7 min drive</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section id="Rooms" className="section mt-8 sm:mt-5 lg:mt-10 bg-[#fff] px-1 xxs:px-2 xs:px-5 py-7 xxs:py-10">
                                        <h2 className="text-gray-800 text-2xl font-medium mb-8">Choose your room</h2>
                                        <div className="grid px-2 xxs:px-0 gap-y-8 3xl:gap-y-0 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 place-items-center sm:place-items-start lg:place-items-center">
                                            {
                                                item.rooms.map((r, i) => <Room key={i} data={r}></Room>)
                                            }
                                        </div>
                                    </section>
                                    <section id="About" className="section mt-8 sm:mt-5 lg:mt-10 bg-[#fff] px-1 xxs:px-2 xs:px-5 py-7 xxs:py-10">
                                        <div className='border-b border-gray-200 pb-10'>
                                            <div className='lg:flex text-gray-900 justify-between'>
                                                <div className='lg:w-1/3'>
                                                    <h2 className='text-center lg:text-left mb-10 font-semibold text-base xxs:text-lg xs:text-2xl xl:text-3xl 2xl:text-4xl'>About this property</h2>
                                                </div>
                                                <div className='lg:w-2/3'>
                                                    <div>
                                                        <h3 className='text-sm xxs:text-base xs:text-lg lg:text-xl font-medium mb-2'>Radisson Blu Chattogram Bay View</h3>
                                                        <p className='text-gray-600'>Situated on the bay, Radisson Blu Chattogram Bay View is a great choice for a stay in Chittagong. Guests can grab a bite to eat at one of the 3 restaurants and visit the spa to be pampered with hot stone massages, aromatherapy, or reflexology. Other highlights at this luxurious hotel include an outdoor pool, a poolside bar, and a fitness center.</p>
                                                    </div>
                                                    <div className='mt-6 xs:mt-10'>
                                                        <h3 className='text-sm xxs:text-base xs:text-lg lg:text-xl font-medium mb-2'>Languages</h3>
                                                        <p className='text-gray-600'>Dutch, English, French, German</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-16">
                                            <div className='lg:flex text-gray-900 justify-between'>
                                                <div className='lg:w-1/3'>
                                                    <h2 className='text-center lg:text-left mb-10 font-semibold text-base xxs:text-lg xs:text-2xl xl:text-3xl 2xl:text-4xl'>Cleaning and safety practices</h2>
                                                </div>
                                                <div className='lg:w-2/3'>
                                                    {
                                                        item.safety.map((x, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    <h3 className='text-sm xxs:text-base xs:text-lg lg:text-xl font-medium'>{x.heading}</h3>
                                                                    <div className='mt-2 mb-6 xs:mb-10'>
                                                                        {
                                                                            x.data.map((p, q) => {
                                                                                return (
                                                                                    <p key={q} className='text-gray-600'>{p}</p>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section id="Amenities" className="section mt-8 sm:mt-5 lg:mt-10 bg-[#fff] px-1 xxs:px-2 xs:px-5 py-7 xxs:py-10">
                                        <div className='border-b border-gray-200 pb-10'>
                                            <div className='xl:flex text-gray-900 justify-between'>
                                                <div className='xl:w-1/3'>
                                                    <h2 className='text-center xl:text-left mb-10 font-semibold text-base xxs:text-lg xs:text-2xl lg:text-4xl'>At a glance</h2>
                                                </div>
                                                <div className='xl:w-2/3'>
                                                    <div className='md:grid grid-cols-2 gap-x-3 lg:gap-x-5'>
                                                        {
                                                            item.AtGlance.map((x, i) => {
                                                                return (
                                                                    <div key={i}>
                                                                        <h3 className='text-sm xxs:text-base xs:text-lg lg:text-xl font-medium flex items-center'><ImPointRight className='mr-2'></ImPointRight> {x.heading}</h3>
                                                                        <div className='mt-2 mb-6 xs:mb-10'>
                                                                            {
                                                                                x.data.map((p, q) => {
                                                                                    return (
                                                                                        <p key={q} className='text-gray-600'>{p}</p>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-b border-gray-200 mt-16">
                                            <div className='xl:flex text-gray-900 justify-between'>
                                                <div className='xl:w-1/3'>
                                                    <h2 className='text-center xl:text-left mb-10 font-semibold text-base xxs:text-lg xs:text-2xl lg:text-4xl'>Property amenities</h2>
                                                </div>
                                                <div className='xl:w-2/3'>
                                                    <div className='md:grid grid-cols-2 gap-x-3 lg:gap-x-5'>
                                                        {
                                                            item.amenities.property.map((x, i) => {
                                                                return (
                                                                    <div key={i}>
                                                                        <h3 className='text-sm xxs:text-base xs:text-lg lg:text-xl font-medium flex items-center'><TiTick className='mr-1 lg:mr-2'></TiTick> {x.heading}</h3>
                                                                        <div className='mt-2 mb-6 xs:mb-10'>
                                                                            {
                                                                                x.data.map((p, q) => {
                                                                                    return (
                                                                                        <p key={q} className='text-gray-600'>{p}</p>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-16">
                                            <div className='xl:flex text-gray-900 justify-between'>
                                                <div className='xl:w-1/3'>
                                                    <h2 className='text-center xl:text-left mb-10 font-semibold text-base xxs:text-lg xs:text-2xl lg:text-4xl'>Room amenities</h2>
                                                </div>
                                                <div className='xl:w-2/3'>
                                                    <div className='md:grid grid-cols-2 gap-x-3 lg:gap-x-5'>
                                                        {
                                                            item.amenities.roomAmenities.map((x, i) => {
                                                                return (
                                                                    <div key={i}>
                                                                        <h3 className='text-sm xxs:text-base xs:text-lg lg:text-xl font-medium flex items-center'><AiFillStar className='mr-1 lg:mr-2'></AiFillStar> {x.heading}</h3>
                                                                        <div className='mt-2 mb-6 xs:mb-10'>
                                                                            {
                                                                                x.data.map((p, q) => {
                                                                                    return (
                                                                                        <p key={q} className='text-gray-600'>{p}</p>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section id="Policies" className="section mt-8 sm:mt-5 lg:mt-10 bg-[#fff] px-1 xxs:px-2 xs:px-5 py-7 xxs:py-10">
                                        <div className='pb-10'>
                                            <div className='lg:flex text-gray-900 justify-between'>
                                                <div className='lg:w-1/3'>
                                                    <h2 className='text-center lg:text-left mb-10 font-semibold text-base xxs:text-lg xs:text-2xl xl:text-3xl 2xl:text-4xl'>Policies and Fees</h2>
                                                </div>
                                                <div className='lg:w-2/3'>
                                                    {
                                                        item.policies.map((x, i) => {
                                                            return (
                                                                <div key={i} className={`${i !== 0 ? 'mt-10' : 'mt-0'}`}>
                                                                    <h3 className='text-sm xxs:text-base xs:text-lg lg:text-xl font-medium mb-2'>{x.heading}</h3>
                                                                    <p className='text-gray-600'>{x.info}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className='bg-[#fff] mt-8 sm:mt-5 lg:mt-10'>
                                    <div className='lg:flex px-1 xxs:px-2 xs:px-5 py-7 xxs:py-10'>
                                        <div className='lg:w-1/3'>
                                            <h2 className='text-gray-800 text-center lg:text-left mb-10 font-semibold text-base xxs:text-lg xs:text-2xl lg:text-4xl'>Frequently asked questions</h2>
                                        </div>
                                        <div className='lg:w-2/3'>
                                            <div className="collapse collapse-arrow bg-transparent rounded-none">
                                                <input type="radio" name="my-accordion-2" />
                                                <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                                    Does offer {item.heading} free cancellation for a full refund?
                                                </div>
                                                <div className="text-gray-700 collapse-content">
                                                    <p>Yes, {item.heading} does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property&apos;s cancellation policy. Just make sure to check this property&apos;s cancellation policy for the exact terms and conditions.</p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-transparent rounded-none">
                                                <input type="radio" name="my-accordion-2" />
                                                <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                                    What are the cleanliness and hygiene measures currently in place at {item.heading}?
                                                </div>
                                                <div className="text-gray-700 collapse-content">
                                                    <p>This property confirms that disinfectant is used to clean the property. Furthermore, guests are provided with hand sanitizer, social distancing measures are in place, and staff are given personal protective equipment. Please note that this information has been provided by our partners.</p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-transparent rounded-none">
                                                <input type="radio" name="my-accordion-2" />
                                                <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                                    Is there a pool at {item.heading}?
                                                </div>
                                                <div className="text-gray-700 collapse-content">
                                                    <p>Yes, there&apos;s an outdoor pool.</p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-transparent rounded-none">
                                                <input type="radio" name="my-accordion-2" />
                                                <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                                    Are pets allowed at {item.heading}?
                                                </div>
                                                <div className="text-gray-700 collapse-content">
                                                    <p>Sorry, pets and service animals aren&apos;t allowed.</p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-transparent rounded-none">
                                                <input type="radio" name="my-accordion-2" />
                                                <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                                    Is parking offered on site at {item.heading}?
                                                </div>
                                                <div className="text-gray-700 collapse-content">
                                                    <p>Yes, there&apos;s free valet parking.</p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-transparent rounded-none">
                                                <input type="radio" name="my-accordion-2" />
                                                <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                                    What are the check-in and check-out times at {item.heading}?
                                                </div>
                                                <div className="text-gray-700 collapse-content">
                                                    <p>Check-in start time: 2 PM; Check-in end time: midnight. Check-out time is noon. Contactless check-in is available.</p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-transparent rounded-none">
                                                <input type="radio" name="my-accordion-2" />
                                                <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                                    What is there to do at {item.heading} and nearby?
                                                </div>
                                                <div className="text-gray-700 collapse-content">
                                                    <p>Practice your swing on the tennis courts. Indulge in a treatment at the spa and soothe your senses in the spa tub. Radisson Blu Chattogram Bay View also has an outdoor pool and a sauna, as well as a steam room and a garden.</p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-transparent rounded-none">
                                                <input type="radio" name="my-accordion-2" />
                                                <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                                    Are there restaurants at or near {item.heading}?
                                                </div>
                                                <div className="text-gray-700 collapse-content">
                                                    <p>Yes, there are 3 onsite restaurants, featuring Asian cuisine.</p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-transparent rounded-none">
                                                <input type="radio" name="my-accordion-2" />
                                                <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                                    What&apos;s the area around {item.heading} like?
                                                </div>
                                                <div className="text-gray-700 collapse-content">
                                                    <p>Radisson Blu Chattogram Bay View is in the heart of Chittagong, a short 1-minute walk from Shishu Park and 2 minutes&apos; walk from Zia Memorial Museum.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                openSlide &&
                <div id="container" className="px-1 xxs:px-2 lg:px-4 absolute top-0 left-0 z-20 bg-[#000000b9] h-[100vh] w-full flex items-center justify-center duration-1000 ease-linear">
                    {
                        singleHotel?.map((item, idx) => {
                            return (
                                <div key={idx} className="flex items-center justify-center">
                                    <AiOutlineClose onClick={handleSlideClose} className="absolute right-1 sm:right-2 top-2 xl:right-5 xl:top-5 bg-[#fff] w-6 h-6 p-1 xl:w-10 xl:h-10 4xl:w-16 4xl:h-16 4xl:p-4  text-gray-950 xl:p-2 rounded-full cursor-pointer"></AiOutlineClose>
                                    <AiOutlineArrowLeft onClick={() => handleMoveSlide('l')} className="bg-[#fff] w-6 h-6 p-1 xl:w-10 xl:h-10 4xl:w-16 4xl:h-16 4xl:p-4  text-gray-950 xl:p-2 rounded-full cursor-pointer"></AiOutlineArrowLeft>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img loading='lazy' className="w-[95%] h-[full] xl:w-[85%] xl:h-[80vh] 2xl:w-[90%] 2xl:h-[90vh] xl:mx-4 2xl:mx-5" src={item.images[slideNumber]} alt="Slider Image" />
                                    </div>
                                    <AiOutlineArrowRight onClick={() => handleMoveSlide('r')} className="bg-[#fff] w-6 h-6 p-1 xl:w-10 xl:h-10 4xl:w-16 4xl:h-16 4xl:p-4  text-gray-950 xl:p-2 rounded-full cursor-pointer"></AiOutlineArrowRight>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
};

export default HotelDetail;