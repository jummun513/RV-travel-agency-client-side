import { useState } from 'react';
import HotelSearch from '../../../shared/HotelSearch/HotelSearch';
import './Hotel.css';
import { MdOutlineExpandMore } from 'react-icons/md';
import { AiOutlineFilter } from 'react-icons/ai';
import { FaMapMarked } from 'react-icons/fa';
import Hotel from './Hotel/Hotel';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../../../shared/Loading/Loading.jsx';
import { Helmet } from 'react-helmet-async';

const Hotels = () => {
    const [seeMore, setSeeMore] = useState(false);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('search');
    const [searchResults, setSearchResults] = useState([]);
    const { data: hotels = [], isLoading } = useQuery(['hotels'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/hotels`);
        return res.json();
    })

    useEffect(() => {
        if (searchQuery !== null && searchQuery !== '' && hotels.length > 0) {
            const newData = hotels?.filter(d => (d.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) || d.location.city.toLowerCase().includes(searchQuery.toLowerCase()) || d.location.country.toLowerCase().includes(searchQuery.toLowerCase())));
            setSearchResults(newData);
        }
        else if (hotels.length > 0) {
            setSearchResults(hotels);
        }
    }, [searchQuery, hotels]);


    return (
        <div className='bg-[#fbfbfb] py-16 xxs:py-24 xs:py-36 md:py-40 xl:py-48 3xl:py-56'>
            <Helmet>
                <title>Hotels - Royal Venture Limited</title>
            </Helmet>
            <div className='xs:bg-gray-50 rounded-md xs:border px-2 xxs:px-5 xs:px-0 mx-auto max-w-screen-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl'><HotelSearch></HotelSearch></div>

            {/* For large device */}
            <div className='hidden lg:block sm:px-[32px] mx-auto max-w-screen-4xl mt-32'>
                <div className="flex">
                    {/* filter section */}
                    <div className='w-4/12 2xl:w-3/12 3xl:w-2/12'>
                        <div className='relative border-2 rounded-lg'>
                            <iframe className='w-full h-full border-none border-2 rounded-lg' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3747017.2622070983!2d87.7026520471155!3d23.489429144532465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adaaed80e18ba7%3A0xf2d28e0c4e1fc6b!2sBangladesh!5e0!3m2!1sen!2sbd!4v1699113404830!5m2!1sen!2sbd" allowFullScreen loading="lazy"></iframe>
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
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                </div>
                                <div className='rating rating-sm mb-2 flex items-center p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                    <span className='text-lg me-2 font-semibold text-gray-950'>2</span>
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                </div>
                                <div className='rating rating-sm mb-2 flex items-center p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                    <span className='text-lg me-2 font-semibold text-gray-950'>3</span>
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                </div>
                                <div className='rating rating-sm mb-2 flex items-center p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                    <span className='text-lg me-2 font-semibold text-gray-950'>4</span>
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                </div>
                                <div className='rating rating-sm flex items-center p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                    <span className='text-lg me-2 font-semibold text-gray-950'>5</span>
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                    <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                </div>
                            </div>

                            <div className='px-3 pb-5'>
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

                    {/* card section */}
                    {
                        isLoading ? <div className='w-8/12 2xl:w-9/12 3xl:w-10/12 ps-10'><Loading></Loading></div> :
                            <div className='w-8/12 2xl:w-9/12 3xl:w-10/12 ps-10'>
                                <p className="label-text text-gray-950 font-extrabold text-xl 2xl:text-2xl first-letter:uppercase">{searchQuery ? searchQuery : "Total"}: {searchResults?.length} properties found</p>
                                {
                                    searchResults?.length > 0 ?
                                        <div>
                                            <div className="form-control w-1/2 mt-8">
                                                <label className="label pt-0">
                                                    <span className="label-text text-gray-950 font-extrabold text-lg 2xl:text-xl">Short By</span>
                                                </label>
                                                <select className="select text-gray-950 xs:text-gray-600 xs:font-semibold select-md 2xl:select-lg select-bordered border-gray-700 bg-[#fbfbfb]">
                                                    <option defaultValue className='text-gray-700 text-sm 2xl:text-lg'>Recommended</option>
                                                    <option className='text-gray-700 text-sm 2xl:text-lg'>Price: low to high</option>
                                                    <option className='text-gray-700 text-sm 2xl:text-lg'>Price: hight to low</option>
                                                    <option className='text-gray-700 text-sm 2xl:text-lg'>Distance from center of city</option>
                                                </select>
                                            </div>
                                            <div className='mt-10'>
                                                {
                                                    searchResults?.map((item, idx) => <Hotel key={idx} data={item}></Hotel>)
                                                }
                                            </div>
                                        </div>
                                        :
                                        <div className='flex justify-center mt-24 text-gray-500 text-sm md:text-base 2xl:text-lg 4xl:text-xl w-8/12 2xl:w-9/12 3xl:w-10/12 ps-10'>{!(hotels.length > 0) ? 'No Data Available!' : 'Nothing match!'}</div>
                                }
                            </div>
                    }
                </div>
            </div>

            {/* For small device */}
            <div className='lg:hidden px-2 xxs:px-[16px] sm:px-[32px] mx-auto max-w-screen-4xl mt-16 xs:mt-32'>
                <div className='px-2 xxs:px-0 flex flex-col-reverse xxs:flex-row xxs:justify-center'>
                    {/* for open modal */}
                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className='mt-2 xxs:mt-0 xxs:me-3 sm:me-5 md:me-10 btn btn-sm xxs:btn-md sm:btn-wide bg-transparent border-primary hover:border-secondary text-gray-950 hover:bg-primary hover:text-gray-900'>
                        <AiOutlineFilter className='h-3 w-3 xs:h-5 xs:w-5'></AiOutlineFilter>
                        <span>Sort & Filter</span>
                    </button>

                    {/* view via map button */}
                    <button className='btn btn-sm xxs:btn-md sm:btn-wide bg-transparent border-primary hover:border-secondary text-gray-950 hover:bg-primary hover:text-gray-900'>
                        <span>View in map</span>
                        <FaMapMarked className='h-3 w-3 xs:h-5 xs:w-5'></FaMapMarked>
                    </button>

                    {/* modal */}
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box bg-[#fbfbfb] rounded-sm">
                            {/* top form close button */}
                            <form method="dialog">
                                <button className="mt-2 btn btn-sm sm:btn-md btn-circle btn-ghost text-gray-950 bg-gray-100 absolute right-2 top-2">✕</button>
                            </form>

                            {/* modal */}
                            <div className='w-full'>
                                <form className='rounded-lg my-10'>
                                    <label htmlFor="default-search" className="text-sm font-medium text-gray-900">Search By Property name</label>
                                    <div className="relative mt-2">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 xxs:pl-3 pointer-events-none">
                                            <svg className="h-3 w-3 xxs:w-4 xxs:h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search" className="block w-full p-2 xs:p-4 pl-7 xs:pl-10 text-xs xxs:text-sm text-gray-900 border border-gray-700 rounded-lg bg-gray-50 focus:ring-primary" placeholder="e.g., Radisson blu" required />
                                        <button type="submit" className="text-gray-950 absolute right-1 bottom-[4.5px] xxs:bottom-[7px] xs:right-2.5 xs:bottom-2.5 bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg xs:text-sm px-2 xs:px-4 py-1 xs:py-2 text-xs">Search</button>
                                    </div>
                                </form>
                                <div className="form-control w-full mb-10">
                                    <label className="label">
                                        <span className="label-text text-gray-950 font-extrabold text-xl">Short By</span>
                                    </label>
                                    <select className="select text-gray-950 xs:text-gray-600 xs:font-semibold select-sm xs:select-md select-bordered border-gray-700 bg-[#fbfbfb]">
                                        <option defaultValue className='text-gray-700'>Recommended</option>
                                        <option className='text-gray-700'>Price: low to high</option>
                                        <option className='text-gray-700'>Price: hight to low</option>
                                        <option className='text-gray-700 leading-10'>Distance from center of city</option>
                                    </select>
                                </div>
                                <div className='border-2 rounded-lg'>
                                    <h2 className='border-b-2 p-3 font-extrabold text-gray-950 text-lg xxs:text-xl'>Filter By</h2>
                                    <div className='px-3 border-b-2 pb-5'>
                                        <h3 className='font-semibold text-gray-900 mt-8 mb-3'>Most Popular</h3>
                                        <div className="form-control">
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Breakfast Included</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Pet friendly</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">SPA</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Pool</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Tennis</span>
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
                                                <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Air conditioning</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Balcony</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Flat-screen TV</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Electric kettle</span>
                                            </label>
                                            {
                                                !seeMore && <button onClick={() => setSeeMore(!seeMore)} className='btn btn-link flex justify-start xs:mt-3 no-underline hover:underline items-center'><span>See more</span> <span><MdOutlineExpandMore className={`w-5 h-5 duration-150 ease-linear`}></MdOutlineExpandMore></span></button>
                                            }
                                            {
                                                seeMore &&
                                                <>
                                                    <label className="cursor-pointer label flex justify-start">
                                                        <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                        <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Soundproof</span>
                                                    </label>
                                                    <label className="cursor-pointer label flex justify-start">
                                                        <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                        <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Coffee/Tea maker</span>
                                                    </label>
                                                    <label className="cursor-pointer label flex justify-start">
                                                        <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                        <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Bathtub</span>
                                                    </label>
                                                    <label className="cursor-pointer label flex justify-start">
                                                        <input type="checkbox" className="checkbox checkbox-sm xxs:checkbox-md rounded-sm xxs:rounded-md checkbox-warning" />
                                                        <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Terrace</span>
                                                    </label>
                                                    <button onClick={() => setSeeMore(!seeMore)} className='btn btn-link flex justify-start xs:mt-3 no-underline hover:underline items-center'><span>See less</span> <span><MdOutlineExpandMore className={`w-5 h-5 duration-150 ease-linear rotate-180`}></MdOutlineExpandMore></span></button>
                                                </>
                                            }
                                        </div>
                                    </div>

                                    <div className='px-3 border-b-2 pb-5'>
                                        <h3 className='font-semibold text-gray-900 mt-8 mb-3'>Star Rating</h3>
                                        <div className='rating rating-xs xs:rating-sm mb-2 flex items-center p-1 xs:p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                            <span className='text-sm xs:text-lg me-1 xs:me-2 font-semibold text-gray-950'>1</span>
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                        </div>
                                        <div className='rating rating-xs xs:rating-sm mb-2 flex items-center p-1 xs:p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                            <span className='text-sm xs:text-lg me-1 xs:me-2 font-semibold text-gray-950'>2</span>
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                        </div>
                                        <div className='rating rating-xs xs:rating-sm mb-2 flex items-center p-1 xs:p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                            <span className='text-sm xs:text-lg me-1 xs:me-2 font-semibold text-gray-950'>3</span>
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                        </div>
                                        <div className='rating rating-xs xs:rating-sm mb-2 flex items-center p-1 xs:p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                            <span className='text-sm xs:text-lg me-1 xs:me-2 font-semibold text-gray-950'>4</span>
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                        </div>
                                        <div className='rating rating-xs xs:rating-sm mb-2 flex items-center p-1 xs:p-3 border w-fit rounded-lg cursor-pointer hover:bg-[#ffb70015]'>
                                            <span className='text-sm xs:text-lg me-1 xs:me-2 font-semibold text-gray-950'>5</span>
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                            <input type="radio" name="rating-1" className="mask mask-star bg-primary" defaultChecked />
                                        </div>
                                    </div>

                                    <div className='px-3 pb-5'>
                                        <h3 className='font-semibold text-gray-900 mt-8 mb-3'>Guest Review Rating</h3>
                                        <div className="form-control">
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-warning checkbox-sm xxs:checkbox-md rounded-full" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Wonderful: 9+</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-warning checkbox-sm xxs:checkbox-md rounded-full" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Very Good: 8+</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-warning checkbox-sm xxs:checkbox-md rounded-full" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Good: 7+</span>
                                            </label>
                                            <label className="cursor-pointer label flex justify-start">
                                                <input type="checkbox" className="checkbox checkbox-warning checkbox-sm xxs:checkbox-md rounded-full" />
                                                <span className="label-text text-xs xxs:text-sm text-gray-900 ms-3">Pleasant: 6+</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* modal apply button */}
                            <div className="modal-action justify-center">
                                <form method="dialog" className=''>
                                    <button className="btn text-gray-950 btn-sm sm:btn-md bg-primary hover:bg-secondary border-none">Apply</button>
                                </form>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                {
                    isLoading ? <div className='mt-12 xs:mt-16'><Loading></Loading></div> :
                        <div className='mt-12 xs:mt-16'>
                            <p className="label-text text-gray-950 font-extrabold text-xl first-letter:uppercase">{searchQuery ? searchQuery : "Total"}: {searchResults?.length} properties found</p>
                            {
                                searchResults?.length > 0 ?
                                    <div>
                                        {
                                            searchResults.map((item, idx) => <Hotel key={idx} data={item}></Hotel>)
                                        }
                                    </div>
                                    :
                                    <div className='flex justify-center mt-12 xs:mt-16'>{!(hotels.length > 0) ? 'No Data Available!' : 'Nothing match!'}</div>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default Hotels;