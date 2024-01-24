import { BsMoonFill } from "react-icons/bs";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import url from '../../../../../assets/images/image-not-found.svg';


const Hotel = (data) => {
    const { _id, thumbnail, location, hotelName } = data.data;
    const [isLoved, setIsLoved] = useState(false);
    const navigate = useNavigate();

    const ImageUrl = thumbnail[0]?.url?.split('https://ik.imagekit.io/nz0ptgnila/');

    let finalUrl = '';

    if (ImageUrl) {
        finalUrl = `https://ik.imagekit.io/nz0ptgnila/tr:w-700/${ImageUrl[1]}`;
    }

    // cutting the sort hotel name
    function newHotelName(str) {
        const wordsArray = str.split(' ');
        if (wordsArray.length > 4) {
            const firstThreeWords = wordsArray.slice(0, 6);
            const result = firstThreeWords.join(' ');
            return result;
        }
        else {
            return str;
        }
    }

    return (
        <div className="rounded-md sm:rounded-lg bg-[#fbfbfb] shadow-lg sm:shadow-md border mt-7 xl:mt-10">
            <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-1/2 md:w-2/5 lg:w-1/2 2xl:w-2/5 p-2 flex items-center">
                    <img loading='lazy' src={finalUrl === '' ? url : finalUrl} className={`rounded-md sm:rounded-lg aspect-16/9 sm:aspect-4/3 lg:aspect-4/3 xl:aspect-16/9 ${finalUrl === '' ? 'object-contain w' : 'w-full object-cover'}`} />
                    <div onClick={() => { setIsLoved(!isLoved) }} className="z-[11] absolute bg-[#fbfbfb] p-1 sm:p-2 top-3 left-3 rounded-md sm:rounded-lg cursor-pointer">{isLoved ? <AiTwotoneHeart className="w-4 h-4 sm:h-6 sm:w-6 text-primary"></AiTwotoneHeart> : <AiOutlineHeart className="h-4 w-4 sm:h-6 sm:w-6 text-primary"></AiOutlineHeart>}</div>
                </div>
                <div className="w-full sm:w-1/2 md:w-3/5 lg:w-1/2 2xl:w-3/5 px-2 xxs:px-3 xs:px-5 sm:px-3 md:ps-5 lg:ps-3 xl:ps-5 pt-2 pb-3 xxs:pt-3 xxs:pb-5 xs:pb-8 sm:pb-3 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div className="text-gray-950">
                            <h2 className="font-bold hover:underline text-blue-500 cursor-pointer"><Link to={`/hotel-details/${_id}`} className="text-xs xxs:text-sm md:text-lg 2xl:text-xl 3xl:text-3xl">{newHotelName(hotelName)}</Link></h2>
                            <p className="text-xs xxs:text-sm 2xl:text-base">{location.country}</p>
                            <p className="text-xs xxs:text-sm 2xl:text-base">{location.city}</p>
                        </div>
                        <button disabled onClick={() => navigate(`/booked-hotels/${_id}`)} className="btn btn-xs xxs:btn-sm 2xl:btn-md bg-primary text-gray-900 border-none hover:bg-secondary">Book Now</button>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="mt-3 sm:mt-0">
                            <div>
                                <p className="text-green-500 text-xs xxs:text-sm 2xl:text-base lg:my-1">Fully refundable</p>
                                <p className="text-gray-600 flex items-center text-xs xxs:text-sm sm:text-sm 2xl:text-base"><span className="me-1 p-1 bg-purple-600 text-gray-50 rounded sm:rounded-md"><BsMoonFill className="h-2 w-2 xxs:w-3 xxs:h-3 2xl:w-5 2xl:h-5"></BsMoonFill></span> Collect stamps</p>
                            </div>
                            <div className="flex items-center mt-2">
                                {/* <div className="bg-gray-200 text-gray-950 text-sm xxs:text-base p-1 xxs:px-2 xxs:py-1 rounded me-2 font-bold">{rating}</div> */}
                                <div>
                                    <p className="text-gray-600 text-sm xxs:text-base font-semibold">Good</p>
                                    <p className="text-gray-600 text-xs xxs:text-sm 2xl:text-base">14 reviews</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            {/* <div className="p-1 xl:p-2 text-gray-50 bg-red-500 rounded text-xs xxs:text-sm mb-2">10% off</div> */}
                            {/* <p className="text-gray-800 font-semibold"><strike>USD 26</strike> <span>USD 24</span></p> */}
                            <p className="text-gray-700">Taka {data?.data?.rooms[0]?.price} total</p>
                            <p className="text-[10px] xxs:text-xs 2xl:text-sm text-gray-400">Includes taxes and fees <span className="text-red-500">*</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotel;