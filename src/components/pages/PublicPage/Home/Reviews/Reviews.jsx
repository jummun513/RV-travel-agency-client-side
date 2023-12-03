import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Reviews.css';
import Review from './Review/Review';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';

const data = [
    { id: 5, url: "https://i.ibb.co/GxNmWkR/reviews1.jpg", alt: "Review given user image", occupation: 'Businessman', reviews: `"Royal Venture Limited made our dream vacation a reality! Impeccable service, personalized recommendations, and stress-free planning. They exceeded our expectations."`, star: "", name: "Abdullah Alim" },
    { id: 3, url: "https://i.ibb.co/f2X5Lgf/reviews2.jpg", alt: "Review given user image", occupation: 'Engineer', reviews: `"Exceptional service from Royal Venture! Our family had an unforgettable Greek Islands vacation, thanks to their expertise and attention to detail."`, star: "", name: "Rahimul Islam" },
    { id: 6, url: "https://i.ibb.co/84QYQsh/review4.jpg", alt: "Review given user image", occupation: 'Professor', reviews: `"Last-minute trip to Paris? Royal Venture delivered top-notch accommodations and a perfect itinerary. Prompt and professional – our go-to travel agency."`, star: "", name: "Shabnam Sultana" },
    { id: 1, url: "https://i.ibb.co/xLm13mP/reviews3.jpg", alt: "Review given user image", occupation: 'TV Model', reviews: `"First-time cruiser? Royal Venture made it unforgettable. Perfect cruise choice and great support. Already planning our next adventure with them!"`, star: "", name: "Ahmed Rizwan" },
    { id: 4, url: "https://i.ibb.co/w0PWgZV/review6.jpg", alt: "Review given user image", occupation: 'Businessman', reviews: `"Our African safari with Royal Venture was educational and thrilling. Knowledgeable guides and incredible wildlife encounters. Highly recommended!"`, star: "", name: "Saifullah Khan" },
    { id: 2, url: "https://i.ibb.co/jg9j41C/review5.jpg", alt: "Review given user image", occupation: 'Student', reviews: `"Last-minute trip to Paris? Royal Venture delivered top-notch accommodations and a perfect itinerary. Prompt and professional – our go-to travel agency."`, star: "", name: "Mohammad Hasan" },
]


const Reviews = () => {
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