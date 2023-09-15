import styled from 'styled-components';
import backVideo from '../../../../assets/videos/bannerVideo.mp4';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaHotel, FaCcVisa, FaPlaneDeparture } from 'react-icons/fa';
import { MdHolidayVillage } from 'react-icons/md';
import './Banner.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react';

const Banner = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <Container className='h-[50vh] xl:h-[60vh] 2xl:h-[70vh] top-[45px] xxs:top-[64px] lg:top-[74px] 2xl:top-[90px] 3xl:top-[106px]'>
      <Video autoPlay muted loop id="background-video">
        <source src={backVideo} type="video/mp4" />
      </Video>
      <OverLay className='bg-[#0005]'></OverLay>
      <Content>
        <div className='px-4 xs:px-0 mx-auto max-w-screen-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl'>
          <Tabs className='bg-[#ffffffe0] rounded-lg'>
            <TabList id='#nestedNav' className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-center items-center border-b-2 border-gray-400 rounded-t-lg'>
              <Tab className='flex justify-center items-center py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer rounded-t-lg sm:rounded-se-none sm:rounded-ss-lg'><span><FaHotel className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></FaHotel></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Hotel</span></Tab>
              <Tab className='flex justify-center items-center py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer sm:rounded-se-lg xl:rounded-se-none'><span><MdHolidayVillage className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></MdHolidayVillage></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Holiday</span></Tab>
              <Tab className='flex justify-center items-center py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer'><span><FaPlaneDeparture className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></FaPlaneDeparture></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Flight</span></Tab>
              <Tab className='flex justify-center items-center py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer xl:rounded-se-lg'><span><FaCcVisa className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></FaCcVisa></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Visa</span></Tab>
            </TabList>

            <TabPanel>
              <form action="" className='px-5 py-10'>
                <div className='grid grid-cols-3 gap-x-5'>
                  <div className='border-2 border-gray-300 px-4 py-2 rounded-md'>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text text-gray-700">Enter city or property</span>
                      </label>
                      <input type="text" placeholder="Search Hotel" className="input input-bordered input-info input-sm w-full max-w-[250px] text-gray-950 bg-white" />
                      <label className="label">
                        <span className="label-text-alt text-gray-600">Select a Hotel</span>
                      </label>
                    </div>
                  </div>
                  <div className='relative grid grid-cols-2 border-2 border-gray-300 rounded-md'>
                    <div className='px-4 py-2'>
                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text text-gray-700">Check-In Date</span>
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
                          className='input input-bordered input-info input-sm w-full max-w-36 text-gray-950 bg-white'
                        >
                          <div className='text-red-500 text-sm'>Do not forget to check the weather!</div>
                        </DatePicker>
                        <label className="label">
                          <span className="label-text-alt text-gray-600">Day: {weekday[startDate?.getDay()]}</span>
                        </label>
                      </div>
                    </div>
                    <div className='px-4 py-2'>
                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text text-gray-700">Check-Out Date</span>
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
                          className='input input-bordered input-info input-sm w-full max-w-36 text-gray-950 bg-white'
                        >
                          <div className='text-red-500 text-sm'>Do not forget to check the weather!</div>
                        </DatePicker>
                        <label className="label">
                          <span className="label-text-alt text-gray-600">Day: {weekday[endDate?.getDay()]}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='border-2 border-gray-300 px-4 py-2 rounded-md'>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text text-gray-700">Guests & Rooms</span>
                      </label>
                      <input type="text" placeholder="Search Hotel" className="input input-bordered input-info input-sm w-full max-w-[250px] text-gray-950 bg-white" />
                      <label className="label">
                        <span className="label-text-alt text-gray-600">Select a Hotel</span>
                      </label>
                    </div>
                  </div>
                </div>
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
    padding: 100px 0;
`