import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Reviews.css';
import Review from './Review/Review';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import { useQuery } from 'react-query';
import Loading from "../../../../shared/Loading/Loading";
import NotFound from "../../../../shared/NotFound/NotFound";

const Reviews = () => {
    const { data: reviews = [], isLoading, isError } = useQuery(['reviews'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/reviews`);
        return res.json();
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div id="reviews" className="bg-[#fbfbfb] pt-12 xxs:pt-18 md:pt-32 2xl:pt-48">
            <div className="bg-primary py-12 xxs:py-18 md:py-32 2xl:py-32">
                <div className="px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl">
                    <div className="text-center mb-8 sm:mb-10 lg:mb-20">
                        <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl">Our Happy Clients</h2>
                    </div>
                    <Swiper
                        keyboard={true}
                        speed={700}
                        autoplay={{
                            delay: 2500000,
                            disableOnInteraction: false,
                        }}
                        slidesPerView={1}
                        spaceBetween={20}
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
                        pagination={{
                            dynamicBullets: true,
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + ' sm:ring-1 lg:ring-2 ring-slate-100 ring-offset-primary sm:ring-offset-1 lg:ring-offset-2 2xl:ring-offset-4">' + '</span>';
                            },
                        }}
                        modules={[Autoplay, Pagination, Keyboard]}
                        className="mySwiper"
                    >
                        {
                            reviews.map((d, i) =>
                                <SwiperSlide key={i}>
                                    <Review d={d}></Review>
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