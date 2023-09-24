import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PopularDestination.css';
// import required modules
import { Autoplay, EffectCoverflow, Pagination, Keyboard, Navigation } from 'swiper/modules';


const data = [
    { img: "https://i.ibb.co/xswMtPL/chittagong.jpg", location: "Chittagong", hotel: 20 },
    { img: "https://i.ibb.co/yd8Rb01/dhaka.jpg", location: "Dhaka", hotel: 20 },
    { img: "https://i.ibb.co/WBqmhxF/sunamganj.jpg", location: "Sunamganj", hotel: 20 },
    { img: "https://i.ibb.co/drhZpWh/sylhet.jpg", location: "Sylhet", hotel: 20 },
    { img: "https://i.ibb.co/WcF70Ys/Bhola.jpg", location: "Bhola", hotel: 20 },
    { img: "https://i.ibb.co/PWsSk6D/coxs-Bazar.jpg", location: "Cox's Bazar", hotel: 20 },
    { img: "https://i.ibb.co/cQT6SxL/bandarban.jpg", location: "Bandarban", hotel: 20 },
    { img: "https://i.ibb.co/t46sKQP/narayanganj.jpg", location: "Narayanganj", hotel: 20 },
]

const PopularDestination = () => {
    return (
        <div id="popularDestination" className="bg-[#fbfbfb] pt-40 xs:pt-56 3xl:pt-72">
            <div className="px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl">
                <div className="text-center">
                    <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl  xs:text-3xl md:text-5xl xl:text-5xl 3xl:text-7xl">Explore Bangladesh</h2>
                    <p className="text-xs xxs:text-sm xs:text-base 2xl:text-lg 3xl:text-xl mt-4 xs:mt-8 text-gray-600">Bangladesh, a South Asian country with a rich cultural heritage and diverse landscapes, offers several popular tourist destinations. Like, Sundarbans Mangrove Forest, Cox&lsquo;s Bazar, Sajek Valley, Bandarban etc.</p>
                    <Swiper
                        effect={'coverflow'}
                        keyboard={true}
                        rewind={true}
                        navigation={true}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: 0,
                            depth: 0,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        autoplay={{
                            delay: 300000,
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
                                navigation: 'false'
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
                                return '<span class="' + className + ' md:ring-2 md:ring-primary md:ring-offset-2">' + '</span>';
                            },
                        }}
                        modules={[Autoplay, EffectCoverflow, Pagination, Keyboard, Navigation]}
                        className="mySwiper xs:mt-5 md:mt-10 lg:mt-14"
                    >
                        {
                            data.map((x, i) => {
                                return (
                                    <SwiperSlide key={i} className='rounded-3xl relative cursor-pointer'>
                                        <img className='rounded-3xl' src={x.img} />
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

export default PopularDestination;