import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ExploreBD.css';
import { Autoplay, EffectCoverflow, Pagination, Keyboard, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';


const data = [
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/explore%20bd/tr:w-600/chittagong.jpg?updatedAt=1698387878028", location: "Chittagong", hotel: 25, link: `/hotels-list?search=chittagong` },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/explore%20bd/tr:w-600/dhaka.jpg?updatedAt=1698387878427", location: "Dhaka", hotel: 30, link: `/hotels-list?search=dhaka` },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/explore%20bd/tr:w-600/sunamganj.jpg?updatedAt=1698387878076", location: "Sunamganj", hotel: 3, link: `/hotels-list?search=sunamganj` },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/explore%20bd/tr:w-600/Bhola.jpg?updatedAt=1698387878418", location: "Patuakhali", hotel: 5, link: `/hotels-list?search=patuakhali` },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/explore%20bd/tr:w-600/sylhet.jpg?updatedAt=1698387878411", location: "Sylhet", hotel: 11, link: `/hotels-list?search=sylhet` },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/explore%20bd/tr:w-600/coxs-Bazar.jpg?updatedAt=1698387878023", location: "Cox's Bazar", hotel: 35, link: `/hotels-list?search=cox's` },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/explore%20bd/tr:w-600/bandarban.jpg?updatedAt=1698387877920", location: "Bandarban", hotel: 8, link: `/hotels-list?search=bandarban` },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/explore%20bd/tr:w-600/narayanganj.jpg?updatedAt=1698387877765", location: "Narayanganj", hotel: 6, link: `/hotels-list?search=narayanganj` },
]

const ExploreBD = () => {
    const navigate = useNavigate();
    return (
        <div id="explorebd" className="bg-[#fbfbfb] pt-24 xxs:pt-36 md:pt-48 2xl:pt-60">
            <div className="px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl">
                <div className="text-center">
                    <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl">Explore Bangladesh</h2>
                    <p className="text-justify xs:text-center text-xs xxs:text-sm xs:text-base 2xl:text-lg 3xl:text-xl mt-4 xs:mt-8 text-gray-900 md:w-[90%] lg:w-[80%] mx-auto">Bangladesh, a South Asian country with a rich cultural heritage and diverse landscapes, offers several popular tourist destinations. Like, Sundarbans Mangrove Forest, Cox&lsquo;s Bazar, Sajek Valley, Bandarban, Rangamati, Kuakata, Sylhet, Dhaka, Paharpur, Mahasthangarh etc.</p>
                    <Swiper
                        effect={'coverflow'}
                        keyboard={true}
                        lazy={'true'}
                        rewind={true}
                        speed={1000}
                        navigation={true}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: 0,
                            depth: 0,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            270: {
                                slidesPerView: 1,
                                spaceBetween: 5,
                            },
                            450: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                            1536: {
                                slidesPerView: 5,
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
                        modules={[Autoplay, EffectCoverflow, Pagination, Keyboard, Navigation]}
                        className="mySwiper xs:mt-5 md:mt-10 lg:mt-10"
                    >
                        {
                            data?.map((x, i) => {
                                return (
                                    <SwiperSlide onClick={() => navigate(x.link)} key={i} className='rounded-3xl relative cursor-pointer'>
                                        <img loading='lazy' className='rounded-3xl aspect-[3/4]' src={x.img} />
                                        <div className='absolute bottom-5 left-3 text-start'>
                                            <h4 className='font-bold text-lg text-slate-50'>{x.location}</h4>
                                            <p className='text-gray-100'>Total {x.hotel} hotels available</p>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ExploreBD;