import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Room.css';
import { MdOutlinePhotoSizeSelectSmall, MdOutlineBed } from 'react-icons/md';
import { BsFillPersonFill, BsWifi2, BsFillMoonFill } from 'react-icons/bs';
import { GiCoffeeCup } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


const Room = (data) => {
    const { bed, breakfast, name, parking, pictures, price, size, wifi, sleep, discountPrice } = data.data;
    const { hotelId } = data;
    const navigate = useNavigate();

    return (
        <div id='room' className="w-[250px] xxs:w-80 xs:w-96 bg-base-100 border relative z-10 rounded-md">
            <div>
                <Swiper cssMode={true} navigation={true} modules={[Navigation]} className="roomSwiper rounded-t-md">
                    {
                        pictures?.map((x, i) => <SwiperSlide key={i}><img loading='lazy' src={x.url} className='rounded-t-md aspect-16/9 object-cover' alt='' /></SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className='px-3 py-5 text-gray-700'>
                <h5 className='text-gray-800 text-lg xxs:text-xl font-medium'>{name}</h5>
                <p className='text-xs xs:text-sm text-gray-600 mt-1 mb-3'>8/10 Good</p>
                <p className='flex items-center mt-1 xxs:mt-2'><MdOutlineBed className='xxs:h-5 xxs:w-5 h-4 w-4 me-2 xs:me-3'></MdOutlineBed><span>{bed}</span></p>
                <p className='flex items-center mt-1 xxs:mt-2'><BsFillPersonFill className='xxs:h-5 xxs:w-5 h-4 w-4 me-2 xs:me-3'></BsFillPersonFill><span>Sleeps {sleep}</span></p>
                <p className='flex items-center mt-1 xxs:mt-2'><MdOutlinePhotoSizeSelectSmall className='xxs:h-5 xxs:w-5 h-4 w-4 me-2 xs:me-3'></MdOutlinePhotoSizeSelectSmall><span>{size}</span></p>
                <p className='flex items-center mt-1 xxs:mt-2'><BsWifi2 className='xxs:h-5 xxs:w-5 h-4 w-4 me-2 xs:me-3'></BsWifi2><span>{wifi ? 'Free Wifi' : 'No Internet'}</span></p>
                <p className='flex items-center mt-1 xxs:mt-2'><GiCoffeeCup className='xxs:h-5 xxs:w-5 h-4 w-4 me-2 xs:me-3'></GiCoffeeCup><span>{breakfast ? "Free Breakfast" : "No Breakfast"}</span></p>
                <p className='flex items-center mt-1 xxs:mt-2'><AiFillCar className='xxs:h-5 xxs:w-5 h-4 w-4 me-2 xs:me-3'></AiFillCar><span>{parking ? "Free valet parking" : "No Parking"}</span></p>
                <p className='flex items-center mt-1 xxs:mt-2'><BsFillMoonFill className='xxs:h-5 xxs:w-5 h-4 w-4 me-2 xs:me-3 bg-purple-600 text-[#fff] p-1 rounded'></BsFillMoonFill><span>Collect and Redeem</span></p>
                <div className='flex justify-between items-end mt-4'>
                    <div>
                        {price && <p className='text-base xxs:text-lg font-semibold'><strike>TAKA {price}/-</strike></p>}
                        <p className='text-base xxs:text-lg font-semibold'>{price && 'After discount'} TAKA {discountPrice}/-</p>
                        {/* <p className='text-sm xxs:text-base'>USD {price + 20} total</p> */}
                        <p className='text-xs xxs:text-sm'>Includes taxes & fees</p>
                    </div>
                    <button onClick={() => navigate(`/booked-hotels/${hotelId}`)} className='btn btn-xs xxs:btn-sm border-none bg-primary hover:bg-primary text-gray-950'>Select</button>
                </div>
            </div>
        </div>
    );
};

export default Room;