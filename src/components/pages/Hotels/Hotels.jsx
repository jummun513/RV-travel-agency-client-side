import { useState } from 'react';
import HotelSearch from '../../shared/HotelSearch/HotelSearch';
import './Hotel.css';
import { MdOutlineExpandMore } from 'react-icons/md';

const Hotels = () => {
    const [seeMore, setSeeMore] = useState(false);

    return (
        <div className='bg-[#fbfbfb] pt-20 xxs:pt-32 xs:pt-40 xl:pt-56'>
            <div className='xs:bg-gray-50 rounded-md xs:border px-2 xxs:px-5 xs:px-0 mx-auto max-w-screen-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl'><HotelSearch></HotelSearch></div>
            <div className='hidden lg:block px-2 xxs:px-[16px] sm:px-[32px] mx-auto max-w-screen-4xl mt-32'>
                <div className='w-4/12 2xl:w-3/12 3xl:w-2/12'>
                    <div className='relative border-2 rounded-lg'>
                        <iframe className='w-full h-full border-none border-2 rounded-lg' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59051.312105207224!2d91.73999934863278!3d22.326918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8b46373368d%3A0x7f0aa59b4138e5b3!2sHotel%20Agrabad!5e0!3m2!1sen!2sbd!4v1694972262735!5m2!1sen!2sbd" allowfullscreen loading="lazy"></iframe>
                        <div className='text-center bg-[#fffb] py-2 absolute bottom-0 rounded-b-lg w-full link text-blue-600'>View in map</div>
                    </div>
                    <form className='rounded-lg my-10'>
                        <label htmlFor="default-search" className="text-sm font-medium text-gray-900">Search By Property name</label>
                        <div className="relative mt-2">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-700 rounded-lg bg-gray-50 focus:ring-primary" placeholder="e.g., Radisson blu" required />
                            <button type="submit" className="text-gray-950 absolute right-2.5 bottom-2.5 bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-4 py-2">Search</button>
                        </div>
                    </form>
                    <div className='border-2 rounded-lg'>
                        <h2 className='border-b-2 p-3 font-extrabold text-gray-950 text-xl'>Filter By</h2>
                        <div className='px-3 border-b-2 pb-5'>
                            <h3 className='font-semibold text-gray-900 mt-8 mb-3'>Most Popular</h3>
                            <div className="form-control">
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning" />
                                    <span className="label-text text-gray-900 ms-3">Breakfast Included</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning" />
                                    <span className="label-text text-gray-900 ms-3">Pet friendly</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning" />
                                    <span className="label-text text-gray-900 ms-3">SPA</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning" />
                                    <span className="label-text text-gray-900 ms-3">Pool</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning" />
                                    <span className="label-text text-gray-900 ms-3">Tennis</span>
                                </label>
                            </div>
                        </div>

                        <div className='px-3 border-b-2 pb-5'>
                            <h2 className='font-semibold text-gray-900 mt-8 mb-3'>Price per night</h2>
                            <div className=''>
                                <div className='flex justify-between text-gray-900 mb-3'><span>USD 100</span><span>USD 1000+</span></div>
                                <input type="range" min={0} max="100" className="range range-xs range-warning" step="10" />
                                <div className="w-full flex justify-between text-xs px-2">
                                    <span className='text-primary'>|</span>
                                    <span className='text-primary'>|</span>
                                    <span className='text-primary'>|</span>
                                    <span className='text-primary'>|</span>
                                    <span className='text-primary'>|</span>
                                    <span className='text-primary'>|</span>
                                    <span className='text-primary'>|</span>
                                    <span className='text-primary'>|</span>
                                    <span className='text-primary'>|</span>
                                    <span className='text-primary'>|</span>
                                </div>
                            </div>
                        </div>

                        <div className='px-3 border-b-2 pb-5'>
                            <h3 className='font-semibold text-gray-900 mt-8 mb-3'>Room Facilities</h3>
                            <div className="form-control">
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning" />
                                    <span className="label-text text-gray-900 ms-3">Air conditioning</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning" />
                                    <span className="label-text text-gray-900 ms-3">Balcony</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning" />
                                    <span className="label-text text-gray-900 ms-3">Flat-screen TV</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning" />
                                    <span className="label-text text-gray-900 ms-3">Electric kettle</span>
                                </label>
                                {
                                    !seeMore && <button onClick={() => setSeeMore(!seeMore)} className='btn btn-link flex justify-start mt-3 no-underline hover:underline items-center'><span>See more</span> <span><MdOutlineExpandMore className={`w-5 h-5 duration-150 ease-linear`}></MdOutlineExpandMore></span></button>
                                }
                                {
                                    seeMore &&
                                    <>
                                        <label className="cursor-pointer label flex justify-start">
                                            <input type="checkbox" className="checkbox checkbox-warning" />
                                            <span className="label-text text-gray-900 ms-3">Soundproof</span>
                                        </label>
                                        <label className="cursor-pointer label flex justify-start">
                                            <input type="checkbox" className="checkbox checkbox-warning" />
                                            <span className="label-text text-gray-900 ms-3">Coffee/Tea maker</span>
                                        </label>
                                        <label className="cursor-pointer label flex justify-start">
                                            <input type="checkbox" className="checkbox checkbox-warning" />
                                            <span className="label-text text-gray-900 ms-3">Bathtub</span>
                                        </label>
                                        <label className="cursor-pointer label flex justify-start">
                                            <input type="checkbox" className="checkbox checkbox-warning" />
                                            <span className="label-text text-gray-900 ms-3">Terrace</span>
                                        </label>
                                        <button onClick={() => setSeeMore(!seeMore)} className='btn btn-link flex justify-start mt-3 no-underline hover:underline items-center'><span>See less</span> <span><MdOutlineExpandMore className={`w-5 h-5 duration-150 ease-linear rotate-180`}></MdOutlineExpandMore></span></button>
                                    </>
                                }
                            </div>
                        </div>

                        <div className='px-3 border-b-2 pb-5'>
                            <h3 className='font-semibold text-gray-900 mt-8 mb-3'>Star Rating</h3>
                            <div className='rating rating-sm mb-2 flex items-center p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                <span className='text-lg me-2 font-semibold text-gray-950'>1</span>
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                            </div>
                            <div className='rating rating-sm mb-2 flex items-center p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                <span className='text-lg me-2 font-semibold text-gray-950'>2</span>
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                            </div>
                            <div className='rating rating-sm mb-2 flex items-center p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                <span className='text-lg me-2 font-semibold text-gray-950'>3</span>
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                            </div>
                            <div className='rating rating-sm mb-2 flex items-center p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                <span className='text-lg me-2 font-semibold text-gray-950'>4</span>
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                            </div>
                            <div className='rating rating-sm flex items-center p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                <span className='text-lg me-2 font-semibold text-gray-950'>5</span>
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                                <input type="radio" name="rating-1" className="mask mask-star bg-primary" checked />
                            </div>
                        </div>

                        <div className='px-3 border-b-2 pb-5'>
                            <h3 className='font-semibold text-gray-900 mt-8 mb-3'>Guest Review Rating</h3>
                            <div className="form-control">
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning rounded-full" />
                                    <span className="label-text text-gray-900 ms-3">Wonderful: 9+</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning rounded-full" />
                                    <span className="label-text text-gray-900 ms-3">Very Good: 8+</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning rounded-full" />
                                    <span className="label-text text-gray-900 ms-3">Good: 7+</span>
                                </label>
                                <label className="cursor-pointer label flex justify-start">
                                    <input type="checkbox" className="checkbox checkbox-warning rounded-full" />
                                    <span className="label-text text-gray-900 ms-3">Pleasant: 6+</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotels;
