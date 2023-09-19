import { BsMoonFill } from "react-icons/bs";

const Hotel = (data) => {
    const { id, heading, rating, desc, reviews, amenities, policies, about, safety, AtGlance, location, rooms, images, thumb
    } = data.data;
    console.log(id, heading, rating, desc, reviews, amenities, policies, about, safety, AtGlance, location, rooms, images, thumb);
    return (
        <div className="rounded-md sm:rounded-lg bg-[#fbfbfb] shadow-md border">
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 md:w-2/5 lg:w-1/2 2xl:w-2/5 p-2"><img src={thumb} className="rounded-md sm:rounded-lg w-full object-cover aspect-16/9 sm:aspect-4/3 lg:aspect-4/3 xl:aspect-16/9" /></div>
                <div className="w-full sm:w-1/2 md:w-3/5 lg:w-1/2 2xl:w-3/5 ps-2 xxs:ps-3 md:ps-5 lg:ps-3 xl:ps-5 pe-1 xxs:pe-2 sm:pe-3 py-1 xxs:py-2 sm:py-3 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div className="text-gray-950">
                            <h2 className="text-sm xxs:text-base md:text-base 2xl:text-xl font-bold">{heading}</h2>
                            <p className="text-xs xxs:text-sm 2xl:text-base">{location.country}</p>
                            <p className="text-xs xxs:text-sm 2xl:text-base">{location.city}</p>
                        </div>
                        <button className="btn btn-xs xxs:btn-sm 2xl:btn-md bg-primary text-gray-900 border-none hover:bg-secondary">Details</button>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="mt-3 sm:mt-0">
                            <div>
                                <p className="text-green-500 text-xs xxs:text-sm 2xl:text-base lg:my-1">Fully refundable</p>
                                <p className="text-gray-600 flex items-center text-xs xxs:text-sm 2xl:text-base"><span className="me-1 p-1 bg-purple-600 text-gray-50 rounded sm:rounded-md"><BsMoonFill className="h-2 w-2 xxs:w-3 xxs:h-3 2xl:w-5 2xl:h-5"></BsMoonFill></span> Collect stamps</p>
                            </div>
                            <div className="flex items-center mt-2">
                                <div className="bg-gray-200 text-gray-950 text-sm xxs:text-base p-1 xxs:px-2 xxs:py-1 rounded me-2 font-bold">{rating}</div>
                                <div>
                                    <p className="text-gray-600 text-sm xxs:text-base font-semibold">Good</p>
                                    <p className="text-gray-600 text-xs xxs:text-sm 2xl:text-base">14 reviews</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="p-1 xl:p-2 text-gray-50 bg-red-500 rounded text-xs xxs:text-sm mb-2">10% off</div>
                            <p className="text-gray-800 font-semibold"><strike>USD 26</strike> <span>USD 24</span></p>
                            <p className="text-gray-700">USD 260 total</p>
                            <p className="text-xs 2xl:text-sm text-gray-400">Includes taxes and fees <span className="text-red-500">*</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotel;