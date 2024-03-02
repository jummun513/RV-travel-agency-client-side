import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './OurPackages.css';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

const OurPackages = () => {
    const navigate = useNavigate();
    const { data: packages = [], isLoading, isError } = useQuery(['packages'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/packages/showToCarousel`);
        return res.json();
    });

    if (isError) {
        return <div className='text-center text-gray-700 font-semibold lg:text-xl mt-5 sm:mt-10 md:mt-16 xl:mt-24'>Content not Found.</div>
    }

    const randomReview = () => {
        const array = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomNumber = array[randomIndex];
        return randomNumber
    }

    const randomRating = () => {
        const array = ['3.5', '4.0', '4.5', '5.0'];
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex]
    }

    return (
        <div id="ourPackages" className='bg-[#fbfbfb] pt-12 xxs:pt-18 md:pt-24 2xl:pt-32'>
            <div className='bg-slate-100 py-12 xxs:py-18 md:py-24 2xl:py-32'>
                <div className='px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl'>
                    <div>
                        <div className="xl:flex justify-between items-center text-center mb-10 md:mb-16">
                            <div className='w-[95%] text-center'>
                                <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl">Popular Packages</h2>
                                <p className="text-justify xs:text-center text-xs xxs:text-sm xs:text-base 2xl:text-lg 3xl:text-xl mt-4 xs:mt-5 text-gray-900 md:w-[90%] lg:w-[80%] mx-auto">If Life&#39;s a journey then your vacation are special destinations at <span className="font-bold text-sm xxs:text-base xs:text-lg 2xl:text-xl 3xl:text-2xl">Royal Venture Limited</span> We hope to partner with you through this journey by bringing you many exotic vacations from beach side to hill side retreat&#39;s from jungle vacation to riverside get ways come, catch a glimpse of your future vacations.</p>
                            </div>
                            <button onClick={() => navigate('/package-tours')} className='mt-4 xs:mt-6 xl:mt-0 btn btn-sm md:btn-md border-none bg-primary hover:bg-secondary hover:border-none text-gray-950'>All Packages</button>
                        </div>
                        {
                            isLoading ?
                                <div>
                                    <div className='h-[200px] mb-28 xxs:mb-5 xs:mb-0 xxs:h-[180px] xs:h-[310px] md:h-[350px] lg:h-[400px] xl:h-[450px] 3xl:h-[560px] grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-1 xs:gap-x-2 md:gap-x-3 xl:gap-x-6 3xl:gap-x-10'>
                                        <div className='skeleton aspect-square w-full bg-gray-300 animate-pulse'></div>
                                        <div className='hidden xxs:block skeleton aspect-square w-full bg-gray-300 animate-pulse'></div>
                                        <div className='hidden md:block skeleton aspect-square w-full bg-gray-300 animate-pulse'></div>
                                        <div className='hidden xl:block skeleton aspect-square w-full bg-gray-300 animate-pulse'></div>
                                    </div>
                                </div>
                                :
                                <Swiper
                                    keyboard={true}
                                    speed={800}
                                    rewind={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                        reverseDirection: false,
                                    }}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                        380: {
                                            slidesPerView: 2,
                                            spaceBetween: 10,
                                        },
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 10,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 20,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                        1280: {
                                            slidesPerView: 4,
                                            spaceBetween: 20,
                                        },
                                        1536: {
                                            slidesPerView: 4,
                                            spaceBetween: 30,
                                        },
                                    }}
                                    pagination={{
                                        dynamicBullets: true,
                                        clickable: true,
                                        renderBullet: function (index, className) {
                                            return '<span class="' + className + ' sm:ring-1 lg:ring-2 ring-primary sm:ring-offset-1 lg:ring-offset-2 2xl:ring-offset-4">' + '</span>';
                                        },
                                    }}
                                    modules={[Autoplay, Pagination, Keyboard]}
                                    className="mySwiper"
                                >
                                    {
                                        packages?.slice(0, 8)?.map((x, i) => {
                                            return (
                                                <SwiperSlide key={i} className='offer-card rounded sm:rounded-xl cursor-pointer relative group/container'>
                                                    <div className="relative group/container">
                                                        <div className="relative rounded-md xs:rounded-xl aspect-[1/1] flex justify-between overflow-hidden items-center group/container">
                                                            <div style={{ backgroundImage: `url(${x?.thumbnail?.[0].url})` }} className="rounded-md xs:rounded-xl h-full w-full transition-all duration-[700ms] ease-in-out transform bg-center bg-cover bg-no-repeat group-hover/container:scale-110"></div>
                                                        </div>
                                                        <div className='ps-2 pt-2 rounded sm:rounded-xl'>
                                                            <p onClick={() => navigate(`/package-tour/details/${x?._id}`)} className='text-sm xxs:text-base lg:text-xl text-slate-950 font-semibold duration-200 ease-linear hover:text-blue-500 hover:underline'>{x?.packageName}</p>
                                                        </div>
                                                        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between'>
                                                            <div className='ps-2 pt-2 rounded sm:rounded-xl'>
                                                                <p className='text-xs xxs:text-sm lg:text-base text-gray-700 mb-1 sm:mb-2'>{x?.packageZone?.city}, {x?.packageZone?.country}</p>
                                                                <p className='text-xs xxs:text-sm lg:text-base text-slate-950 flex items-center'><AiFillStar className='h-3 w-3 xs:h-5 xs:w-5 me-1 text-yellow-500 duration-300 group-hover/container:-rotate-45'></AiFillStar>{randomRating()} <span className='ms-3'>({randomReview()} reviews)</span></p>
                                                            </div>
                                                            {/* <p className='text-center lg:text-start mt-2 lg:mt-0'><button onClick={() => alert('This is under maintaining.')} className='btn btn-xs xxs:btn-sm lg:btn-md bg-primary hover:bg-secondary border-none text-gray-950'>Book This</button></p> */}
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurPackages;