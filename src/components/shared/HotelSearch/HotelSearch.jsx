import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

const HotelSearch = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [openOption, setOpenOption] = useState(false);

    // outside click of the option div close the option
    const optionRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (!optionRef.current?.contains(e.target)) {
                setOpenOption(false);
            }
        }
        document.addEventListener('mousedown', handler);
    })

    const [options, setOptions] = useState({
        adult: 2,
        children: 0,
        room: 1
    })

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev, [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    // confirm maximum 6 guest in 1 room
    useEffect(() => {
        const maxRooms = Math.ceil((options.adult + options.children) / 6);
        if (options.room !== maxRooms) {
            setOptions((prevState) => ({
                ...prevState,
                room: maxRooms,
            }));
        }
    }, [options.adult, options.children]);

    return (
        <div>
            <form action="" className='p-1 xxs:px-5 py-10 flex flex-col items-center'>
                <div className='grid grid-cols-1 gap-y-5 xl:gap-y-0 xl:grid-cols-3 xl:gap-x-5'>
                    <div className='border-2 border-gray-300 px-4 py-2 rounded-md'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text 2xl:text-base text-gray-700">Enter city or property</span>
                            </label>
                            <input type="text" placeholder="Search Hotel" className="input input-bordered input-info input-sm 2xl:input-md w-full min-w-[100px] text-gray-950 bg-white" />
                            <label className="label">
                                <span className="label-text-alt text-gray-600">Select a Hotel</span>
                            </label>
                        </div>
                    </div>
                    <div className='relative grid xs:grid-cols-2 border-2 border-gray-300 rounded-md'>
                        <div className='px-4 py-2 xs:border-e-2 border-gray-300'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text 2xl:text-base text-gray-700">Check-In Date</span>
                                </label>
                                <DatePicker
                                    dateFormat="dd/MM/yy"
                                    closeOnScroll={true} isClearable
                                    placeholderText="Starts date"
                                    defaultValue={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={new Date()}
                                    shouldCloseOnSelect={false}
                                    fixedHeight
                                    className='input input-bordered input-info input-sm 2xl:input-md w-full min-w-[30px] text-gray-950 bg-white'
                                >
                                    <div className='text-red-500 text-xs'>Do not forget to check the weather!</div>
                                </DatePicker>
                                <label className="label">
                                    <span className="label-text-alt text-gray-600">Day: {weekday[startDate?.getDay()]}</span>
                                </label>
                            </div>
                        </div>
                        <div className='px-4 py-2'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text 2xl:text-base text-gray-700">Check-Out Date</span>
                                </label>
                                <DatePicker
                                    dateFormat="dd/MM/yy"
                                    closeOnScroll={true} isClearable
                                    placeholderText="Ends date"
                                    defaultValue={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    shouldCloseOnSelect={false}
                                    fixedHeight
                                    className='input input-bordered input-info input-sm 2xl:input-md w-full min-w-[60px] text-gray-950 bg-white'
                                >
                                    <div className='text-red-500 text-xs'>Do not forget to check the weather!</div>
                                </DatePicker>
                                <label className="label">
                                    <span className="label-text-alt text-gray-600">Day: {weekday[endDate?.getDay()]}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='border-2 border-gray-300 px-4 py-2 rounded-md'>
                        <div ref={optionRef} className="form-control relative w-full max-w-xs">
                            <label className="label">
                                <span className="label-text 2xl:text-base text-gray-700">Guest(s) & Room(s)</span>
                            </label>
                            <input type='button' onClick={() => setOpenOption(!openOption)} value={`${options.adult + options.children} guest(s) + ${options.room} room(s)`} className="input input-bordered input-info input-sm 2xl:input-md cursor-text text-start bg-white text-gray-900 w-full min-w-[100px]" />
                            <div className={`absolute duration-200 ease-in bg-slate-50 w-56 p-5 rounded-md ${openOption ? 'opacity-100 top-20 visible' : 'opacity-0 top-16 invisible'}`}>
                                <p className='text-red-500 text-xs font-bold mb-5 text-start'><sup>*</sup> Maximum 6 guests in 1 room.</p>
                                <div className="flex justify-between items-center border-b pb-3 mb-5">
                                    <span className='font-semibold text-gray-700'>Adult</span>
                                    <div className='flex items-center'>
                                        <button onClick={() => handleOption('adult', 'd')} disabled={options.adult < 2} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e] text-gray-950'>-</button>
                                        <p className='w-14 p-2 mx-3 text-gray-700 border border-primary'>{options.adult}</p>
                                        <button onClick={() => handleOption('adult', 'i')} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary text-gray-950'>+</button>
                                    </div>
                                </div>
                                <p className='text-xs text-start text-red-500 font-semibold mb-2'>- Age under 10 year only is considered as child.</p>
                                <div className="flex justify-between items-center border-b pb-3 mb-5">
                                    <span className='font-semibold text-gray-700'>Child</span>
                                    <div className='flex items-center'>
                                        <button onClick={() => handleOption('children', 'd')} disabled={options.children < 1} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e] text-gray-950'>-</button>
                                        <p className='w-14 p-2 mx-3 text-gray-700 border border-primary'>{options.children}</p>
                                        <button onClick={() => handleOption('children', 'i')} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary text-gray-950'>+</button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className='font-semibold text-gray-700'>Room</span>
                                    <div className='flex items-center'>
                                        <button onClick={() => handleOption('room', 'd')} disabled={(options.room - 1 < Math.ceil((options.adult + options.children) / 6))} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e] text-gray-950'>-</button>
                                        <p className='w-14 p-2 mx-3 text-gray-700 border border-primary'>{options.room}</p>
                                        <button onClick={() => handleOption('room', 'i')} disabled={(options.room + 1 > (options.adult + options.children))} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e] text-gray-950'>+</button>
                                    </div>
                                </div>
                            </div>
                            <label className="label">
                                <span className="label-text-alt text-gray-600">Select a Hotel</span>
                            </label>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Search" className='btn xs:btn-wide mt-10 text-gray-900 btn-sm md:btn-md bg-primary border-none hover:bg-secondary' />
            </form>
        </div>
    );
};

export default HotelSearch;