import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './OurPackages.css';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import { AiFillStar } from 'react-icons/ai';


const data = [
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/packages/Switzerland.png?updatedAt=1698329676068", desc: 'Switzerland', rating: '5', reviews: '36' },
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/packages/Maldives.png?updatedAt=1698329676246", desc: 'Maldives', rating: '5', reviews: '36' },
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/packages/Piazza%20San%20Marco,%20Venezia,%20Italy.png?updatedAt=1698329676195", desc: 'Piazza', rating: '5', reviews: '36' },
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/packages/Handara%20Gate,%20Indonesia%202.png?updatedAt=1698329676307", desc: 'Handcar', rating: '5', reviews: '36' },
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/packages/Tajmahal,%20India.png?updatedAt=1698329727438", desc: 'Taj-mahal', rating: '5', reviews: '36' },
    { url: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/packages/Switzerland.png?updatedAt=1698329676068", desc: 'Switzerland', rating: '5', reviews: '36' },
]

const OurPackages = () => {
    return (
        <div id="ourPackages" className='bg-[#fbfbfb] pt-12 xxs:pt-18 md:pt-24 2xl:pt-32'>
            <div className='bg-slate-100 py-12 xxs:py-18 md:py-24 2xl:py-32'>
                <div className='px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl'>
                    <div>
                        <div className="text-center mb-10 md:mb-16">
                            <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl">Popular Packages</h2>
                            <p className="text-justify xs:text-center text-xs xxs:text-sm xs:text-base 2xl:text-lg 3xl:text-xl mt-4 xs:mt-5 text-gray-900 md:w-[90%] lg:w-[80%] mx-auto">If Life&#39;s a journey then your vacation are special destinations at <span className="font-bold text-sm xxs:text-base xs:text-lg 2xl:text-xl 3xl:text-2xl">Royal Venture Limited</span> We hope to partner with you through this journey by bringing you many exotic vacations from beach side to hill side retreat&#39;s from jungle vacation to riverside get ways come, catch a glimpse of your future vacations.</p>
                        </div>
                        <Swiper
                            keyboard={true}
                            speed={800}
                            rewind={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                                reverseDirection: true,
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
                                data?.map((x, i) => {
                                    return (
                                        <SwiperSlide key={i} className='offer-card rounded sm:rounded-xl cursor-pointer relative group/container'>
                                            <div className="relative group/container">
                                                <div className="relative rounded-md xs:rounded-xl aspect-[1/1] flex justify-between overflow-hidden items-center group/container">
                                                    <div style={{ backgroundImage: `url(${x.url})` }} className="rounded-md xs:rounded-xl h-full w-full transition-all duration-[700ms] ease-in-out transform bg-center bg-contain bg-no-repeat group-hover/container:scale-110"></div>
                                                </div>
                                                <div className='ps-2 pt-2 rounded sm:rounded-xl'>
                                                    <p className='text-sm xxs:text-base lg:text-xl text-slate-950 font-semibold duration-200 ease-linear group-hover/container:text-blue-500 group-hover/container:underline'>{x.desc}</p>
                                                    <p className='text-xs xxs:text-sm lg:text-base text-slate-950 flex items-center'><AiFillStar className='h-3 w-3 xs:h-5 xs:w-5 me-1 text-yellow-500 duration-300 group-hover/container:-rotate-45'></AiFillStar>{x.rating} <span className='ms-3'>({x.reviews} reviews)</span></p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurPackages;