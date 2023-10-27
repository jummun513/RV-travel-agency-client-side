import styled from 'styled-components';
import backVideo from '../../../../../assets/videos/bannerVideo.mp4';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaHotel, FaCcVisa, FaPlaneDeparture } from 'react-icons/fa';
import { MdHolidayVillage } from 'react-icons/md';
import './Banner.css';
import HotelSearch from '../../../../shared/HotelSearch/HotelSearch';

const Banner = () => {
  return (
    <Container className='h-[60rem] sm:h-[60rem] xl:h-[50rem] 3xl:h-[60rem]'>
      <Video autoPlay muted loop id="background-video">
        <source src={backVideo} type="video/mp4" />
      </Video>
      <OverLay className='bg-[#0005]'></OverLay>
      <Content id='search-section' className='top-[10rem] sm:top-[10rem] xl:top-[15rem] 3xl:top-[20rem] '>
        <div className='px-2 xxs:px-5 xs:px-0 mx-auto max-w-screen-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl'>
          <Tabs className='bg-[#ffffffe0] rounded-lg'>
            <TabList id='#nestedNav' className='grid grid-cols-4 sm:grid-cols-2 xl:grid-cols-4 justify-center items-center border-b-2 border-gray-400 rounded-t-lg'>
              <Tab className='flex flex-col sm:flex-row justify-center items-center py-3 sm:py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer rounded-tl-lg sm:rounded-se-none sm:rounded-ss-lg'><span><FaHotel className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></FaHotel></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Hotel</span></Tab>
              <Tab className='flex flex-col sm:flex-row justify-center items-center py-3 sm:py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer sm:rounded-se-lg xl:rounded-se-none'><span><MdHolidayVillage className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></MdHolidayVillage></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Holiday</span></Tab>
              <Tab className='flex flex-col sm:flex-row justify-center items-center py-3 sm:py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer'><span><FaPlaneDeparture className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></FaPlaneDeparture></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Flight</span></Tab>
              <Tab className='flex flex-col sm:flex-row justify-center items-center py-3 sm:py-4 text-gray-700 hover:bg-primary hover:text-gray-950 duration-150 ease-linear cursor-pointer rounded-tr-lg sm:rounded-none xl:rounded-se-lg'><span><FaCcVisa className='xl:w-8 xl:h-8 md:h-5 md:w-5 w-3 h-3 me-2 sm:me-3 lg:me-5 xl:me-7'></FaCcVisa></span> <span className='font-semibold text-xs xxs:text-sm md:text-base'>Visa</span></Tab>
            </TabList>

            <TabPanel>
              <HotelSearch></HotelSearch>
            </TabPanel>
            <TabPanel>
              <div className='py-80 sm:py-60 xl:py-32 text-gray-900 font-bold lg:text-xl'>Coming soon...</div>
            </TabPanel>
            <TabPanel>
              <div className='py-80 sm:py-60 xl:py-32 text-gray-900 font-bold lg:text-xl'>Coming soon...</div>
            </TabPanel>
            <TabPanel>
              <div className='py-80 sm:py-60 xl:py-32 text-gray-900 font-bold lg:text-xl'>Coming soon...</div>
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