import styled from 'styled-components';
import backVideo from '../../../../assets/videos/bannerVideo.mp4';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaHotel, FaCcVisa, FaPlaneDeparture } from 'react-icons/fa';
import { MdHolidayVillage } from 'react-icons/md';
import './Banner.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useRef, useState } from 'react';


const Banner = () => {
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
    <Container className='h-[70rem] sm:h-[60rem] xl:h-[50rem] 3xl:h-[70rem] top-[45px] xxs:top-[64px] lg:top-[74px] xl:top-[100px] 3xl:top-[106px]'>
      <Video autoPlay muted loop id="background-video">
        <source src={backVideo} type="video/mp4" />
      </Video>
      <OverLay className='bg-[#0005]'></OverLay>
      <Content className='top-[10rem] sm:top-[10rem] xl:top-[15rem] 3xl:top-[20rem] '>
        <div className='px-2 xxs:px-5 xs:px-0 mx-auto max-w-screen-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl'>
          <Tabs className='bg-[#ffffffe0] rounded-lg'>
            <TabList id='#nestedNav' className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-center items-center border-b-2 border-gray-400 rounded-t-lg'>
              <Tab className='flex justify-center items-center py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer rounded-t-lg sm:rounded-se-none sm:rounded-ss-lg'><span><FaHotel className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></FaHotel></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Hotel</span></Tab>
              <Tab className='flex justify-center items-center py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer sm:rounded-se-lg xl:rounded-se-none'><span><MdHolidayVillage className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></MdHolidayVillage></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Holiday</span></Tab>
              <Tab className='flex justify-center items-center py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer'><span><FaPlaneDeparture className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></FaPlaneDeparture></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Flight</span></Tab>
              <Tab className='flex justify-center items-center py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer xl:rounded-se-lg'><span><FaCcVisa className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></FaCcVisa></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Visa</span></Tab>
            </TabList>

            <TabPanel>
              <form action="" className='p-1 xxs:px-5 py-10'>
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
                    <div className='px-4 py-2 border-e-2 border-gray-300'>
                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text 2xl:text-base text-gray-700">Check-In Date</span>
                        </label>
                        <DatePicker
                          dateFormat="dd/MM/yy"
                          closeOnScroll={true} isClearable
                          placeholderText="Starts date"
                          selected={startDate}
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
                          selected={endDate}
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
                            <button onClick={() => handleOption('adult', 'd')} disabled={options.adult < 2} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e]'>-</button>
                            <p className='w-14 p-2 mx-3 text-gray-700 border border-primary'>{options.adult}</p>
                            <button onClick={() => handleOption('adult', 'i')} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary'>+</button>
                          </div>
                        </div>
                        <p className='text-xs text-start text-red-500 font-semibold mb-2'>- Age under 10 year only is considered as child.</p>
                        <div className="flex justify-between items-center border-b pb-3 mb-5">
                          <span className='font-semibold text-gray-700'>Child</span>
                          <div className='flex items-center'>
                            <button onClick={() => handleOption('children', 'd')} disabled={options.children < 1} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e]'>-</button>
                            <p className='w-14 p-2 mx-3 text-gray-700 border border-primary'>{options.children}</p>
                            <button onClick={() => handleOption('children', 'i')} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary'>+</button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className='font-semibold text-gray-700'>Room</span>
                          <div className='flex items-center'>
                            <button onClick={() => handleOption('room', 'd')} disabled={(options.room - 1 < Math.ceil((options.adult + options.children) / 6))} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e]'>-</button>
                            <p className='w-14 p-2 mx-3 text-gray-700 border border-primary'>{options.room}</p>
                            <button onClick={() => handleOption('room', 'i')} disabled={(options.room + 1 > (options.adult + options.children))} type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e]'>+</button>
                          </div>
                        </div>
                      </div>
                      <label className="label">
                        <span className="label-text-alt text-gray-600">Select a Hotel</span>
                      </label>
                    </div>
                  </div>
                </div>
                <input type="submit" value="Search" className='btn xxs:btn-wide mt-10 text-gray-700 btn-sm md:btn-md bg-primary border-none hover:bg-secondary' />
              </form>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 3</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 4</h2>
            </TabPanel>
          </Tabs>
        </div>
      </Content>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
position: relative;
  z-index: 10;
`

const Video = styled.video`
position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const OverLay = styled.div`
position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const Content = styled.div`
    position: relative;
    z-index: 11;
    text-align: center;
    color: #fff;
`