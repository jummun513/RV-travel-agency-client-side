import { useNavigate } from "react-router-dom";

const HotelCards = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="relative group/container">
                <div className="relative rounded-md xs:rounded-xl aspect-[16/9] flex justify-between overflow-hidden items-center group/container">
                    <div style={{ backgroundImage: `url(${data?.thumbnail?.[0]?.url})` }} className="rounded-md xs:rounded-xl h-full w-full transition-all duration-[700ms] ease-in-out transform bg-center bg-cover bg-no-repeat group-hover/container:scale-105"></div>
                    <div className="h-full w-full absolute top-0 left-0 bg-black opacity-40 rounded-md xs:rounded-xl z-10"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-2 xxs:p-3 xxs:pb-4 xs:pb-5 xs:p-5 z-[11]">
                    <h4 className="font-bold text-sm xxs:text-base sm:text-lg md:text-2xl lg:text-base 2xl:text-xl 3xl:text-2xl text-slate-50">{data?.hotelName}</h4>
                    <p className="text-[10px] xxs:text-xs sm:text-sm lg:text-base text-slate-100 pt-1 pb-2 xxs:pb-4">{data?.location?.city + ', ' + data?.location?.country}</p>
                    <button onClick={() => navigate(`/hotel-details/${data?._id}`)} className="btn btn-xs xs:btn-sm md:btn-md bg-primary text-slate-950 border-2 border-primary hover:bg-transparent hover:border-primary hover:text-primary ">See Details</button>
                </div>
            </div>
        </div>
    );
};

export default HotelCards;