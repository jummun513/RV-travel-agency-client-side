import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './TopOffer.css';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';


const data = [
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/hot%20offer/2.jpg?updatedAt=1698382210809", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took." },
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/hot%20offer/4.jpg?updatedAt=1698382210599", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took." },
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/hot%20offer/3.jpg?updatedAt=1698382210812", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took." },
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/hot%20offer/1.jpg?updatedAt=1698382210653", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took." },
]

const TopOffer = () => {
    return (
        <div id="topOffer" className='bg-[#fbfbfb] pt-40 xs:pt-56 lg:pt-48 2xl:pt-56 4xl:pt-72'>
            <div className='px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl'>
                <div>
                    <h2 className="mb-5 xxs:mb-7 md:mb-10 xl:mb-16 text-gray-950 font-extrabold text-base xxs:text-2xl  xs:text-3xl md:text-5xl xl:text-5xl">Hot Offers</h2>
                    <Swiper
                        keyboard={true}
                        speed={800}
                        rewind={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1536: {
                                slidesPerView: 3,
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
                            data?.map((x, i) => {
                                return (
                                    <SwiperSlide key={i} className='offer-card rounded sm:rounded-xl cursor-pointer relative'>
                                        <div className='card-image rounded sm:rounded-xl'><img loading='lazy' className='rounded sm:rounded-xl aspect-[16/9]' src={x.url} /></div>
                                        <div className='card-text p-3 bg-primary rounded sm:rounded-xl'>
                                            <p className='text-xs xxs:text-sm lg:text-base text-slate-950'>{x.desc}</p>
                                            <button className='btn btn-xs lg:btn-sm text-slate-50 mt-2'>Details</button>
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

export default TopOffer;