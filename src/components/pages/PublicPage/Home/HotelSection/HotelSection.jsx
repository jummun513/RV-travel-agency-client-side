import { useQuery } from "react-query";
import HotelCards from "./HotelCards/HotelCards";
import Loading from "../../../../shared/Loading/Loading";
import NotFound from "../../../../shared/NotFound/NotFound";

const HotelSection = () => {
    const { data: homeHotels = [], isLoading, isError } = useQuery(['homeHotels'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/hotels/showToHome`);
        return res.json();
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }
    return (
        <div id="hotelSection" className="bg-[#fbfbfb] pt-12 xxs:pt-18 md:pt-24 2xl:pt-32">
            <div className="bg-slate-100 py-12 xxs:py-18 md:py-24 2xl:py-32">
                <div className="px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl">
                    <div className="text-center">
                        <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl">The most popular hotels</h2>
                        <p className="text-justify xs:text-center text-xs xxs:text-sm xs:text-base 2xl:text-lg 3xl:text-xl mt-4 xs:mt-8 text-gray-900 md:w-[90%] lg:w-[80%] mx-auto">If Life&#39;s a journey then your vacation are special destinations at <span className="font-bold text-sm xxs:text-base xs:text-lg 2xl:text-xl 3xl:text-2xl">Royal Venture Limited</span> We hope to partner with you through this journey by bringing you many exotic vacations from beach side to hill side retreat&#39;s from jungle vacation to riverside get ways come, catch a glimpse of your future vacations.</p>
                    </div>
                    <div className="hidden 2xl:grid grid-cols-3 gap-x-10 gap-y-10 mt-16">
                        {
                            homeHotels?.slice(0, 9)?.map((d, i) => <HotelCards key={i} data={d}></HotelCards>)
                        }
                    </div>
                    <div className="2xl:hidden grid lg:grid-cols-2 gap-x-10 gap-y-3 xxs:gap-y-5 sm:gap-y-10 mt-8 xxs:mt-12 sm:mt-16">
                        {
                            homeHotels?.slice(0, 6)?.map((d, i) => <HotelCards key={i} data={d}></HotelCards>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelSection;