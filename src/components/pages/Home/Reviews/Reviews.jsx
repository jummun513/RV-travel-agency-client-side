import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Reviews.css';
import Review from './Review/Review';

const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
]


const Reviews = () => {
    return (
        <div id="reviews" className="bg-[#fbfbfb] pt-12 xxs:pt-18 md:pt-32 2xl:pt-48">
            <div className="bg-primary py-12 xxs:py-18 md:py-16 2xl:py-16">
                <div className="px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl">
                    <div className="text-center mb-8 sm:mb-10 lg:mb-16">
                        <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl">Our Happy Clients</h2>
                    </div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        keyboard={true}
                        breakpoints={{
                            896: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1280: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1536: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className="mySwiper"
                    >
                        {
                            data.map((d, i) =>
                                <SwiperSlide key={i}>
                                    <Review data={d}></Review>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Reviews;